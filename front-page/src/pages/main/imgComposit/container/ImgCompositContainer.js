import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from "react-konva";
import useImage from 'use-image';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import image1 from '../testImage/image1.jpg';
import targetImage from '../testImage/image2.png';

const ImgCompositContainer = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => getState(state)).isLoading;
  const rsltImage = useSelector((state) => getState(state)).rsltImage;
  const { register, getValues, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [rsltImageUrl, setRsltImageUrl] = useState(null);
  const [image] = useImage(imageUrl);
  const [image2] = useImage(imageUrl2);
  const [image3] = useImage(rsltImageUrl);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rect, setRect] = useState(null); // 단일 마스크
  const trRef = useRef(null);
  const rectRef = useRef(null);
  const [stageSize, setStageSize] = useState({width: 600, height: 400});

  const onSubmit = () => {
    dispatch(actions.sendMessage(getValues('message')));
    reset({ message: '' });
  };

  useEffect(() => {
    if(image1) {
      setStageSize({
        width: 600,
        height: 400,
      })
      setImageUrl(image1);
    }
    if(targetImage) {
      setImageUrl2(targetImage);
    }
  }, [image1, targetImage]);

  useEffect(() => {
    if(rsltImage) {
      setRsltImageUrl(rsltImage)
    }
  }, [rsltImage])

  useEffect(() => {
    if (trRef.current && rectRef.current) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [rect]);

  const formProps = {
    ...register("message", { required: true }),
  }
  const backgroundImgUpload = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }
  const prdtImgUpload = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImageUrl2(URL.createObjectURL(file));
    }
  }
// 드래그로 새 마스크 생성
  const handleMouseDown = (e) => {
    if (!image) return;

    // 이미 마스크가 있다면 새로 안 만듦
    if (rect) return;

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !rect) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // 그릴 때 이미지 영역 안에서만
    const x2 = Math.min(Math.max(point.x, 0), stageSize.width);
    const y2 = Math.min(Math.max(point.y, 0), stageSize.height);

    const newRect = {
      ...rect,
      width: x2 - rect.x,
      height: y2 - rect.y,
    };
    setRect(newRect);
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <Container fluid style={{ paddingTop: '8px' }}>
      <Row className="justify-content-md-center" style={{ paddingBottom: '8px' }}>
        <Col xs={6} md={4}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>배경 업로드</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={backgroundImgUpload} />
          </Form.Group>
        </Col>
        <Col xs={6} md={4}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>제품 이미지 업로드</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={prdtImgUpload} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{ paddingBottom: '8px' }}>
        <Col xs={6} md={4}>
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              border: "1px solid #ddd",
              margin: "auto",
              cursor: rect ? "default" : "crosshair",
            }}
          >
            <Layer>
              {imageUrl && (
                <>
                  <KonvaImage image={image} width={600} height={400} />
                  {rect && (
                    <>
                      <Rect
                        ref={rectRef}
                        {...rect}
                        stroke="red"
                        strokeWidth={2}
                        strokeScaleEnabled={false}
                        fill="rgba(255, 0, 0, 0.2)"
                        draggable
                        dragBoundFunc={(pos) => {
                          // 이동 시 이미지 영역 밖으로 못 나가게 제한
                          const node = rectRef.current;
                          const box = {
                            width: node.width(),
                            height: node.height(),
                          };

                          let newX = pos.x;
                          let newY = pos.y;

                          // 왼쪽/위쪽 경계
                          if (newX < 0) newX = 0;
                          if (newY < 0) newY = 0;

                          // 오른쪽/아래쪽 경계
                          if (newX + box.width > stageSize.width)
                            newX = stageSize.width - box.width;
                          if (newY + box.height > stageSize.height)
                            newY = stageSize.height - box.height;

                          return { x: newX, y: newY };
                        }}
                        onDragEnd={(e) => {
                          const node = e.target;
                          setRect({
                            ...rect,
                            x: node.x(),
                            y: node.y(),
                          });
                        }}
                        onTransformEnd={(e) => {
                          const node = rectRef.current;
                          const scaleX = node.scaleX();
                          const scaleY = node.scaleY();

                          node.scaleX(1);
                          node.scaleY(1);

                          let newX = node.x();
                          let newY = node.y();
                          let newWidth = Math.max(5, node.width() * scaleX);
                          let newHeight = Math.max(5, node.height() * scaleY);

                          // 이미지 영역(stageSize) 경계 체크
                          if (newX < 0) newX = 0;
                          if (newY < 0) newY = 0;
                          if (newX + newWidth > stageSize.width) {
                            newWidth = stageSize.width - newX;
                          }
                          if (newY + newHeight > stageSize.height) {
                            newHeight = stageSize.height - newY;
                          }

                          setRect({
                            ...rect,
                            x: newX,
                            y: newY,
                            width: newWidth,
                            height: newHeight,
                          });
                        }}
                      />
                      <Transformer ref={trRef} keepRatio={false} />
                    </>
                  )}
                  </>
                )
              }
            </Layer>
          </Stage>
          <Row className="justify-content-md-center">
            <Col>
              <Button
                variant="outline-danger"
                size="sm"
                className="mt-3"
                onClick={() => setRect(null)}
              >
                마스크 지우기
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            마우스로 드래그 해서 마스킹 영역을 그려보세요
          </Row>
        </Col>
        <Col xs={6} md={4}>
          <Stage
            width={400}
            height={400}
            style={{
              border: "1px solid #ddd",
              margin: "auto",
            }}
          >
            {imageUrl2 && (
              <>
                <Layer>
                  <KonvaImage image={image2} width={600} height={400} />
                </Layer>
              </>
            )}
          </Stage>
          <Row className="justify-content-md-center">
            <Col>
              <Button
                size="sm"
                className="mt-3"
                onClick={onSubmit}
              >
                이미지 생성
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{ paddingBottom: '8px' }}>
        <Row className="justify-content-md-center">
          이 곳에 생성된 이미지가 표시됩니다. 
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <div
              style={{
                display: 'inline-block',
                border: '2px solid #9bfcc0ff', // 테두리
              }}
            >
              <Stage
                width={1280}
                height={720}
              >
                  <Layer>
                    {rsltImageUrl && (
                      <KonvaImage image={image3} width={1280} height={720} />
                    )}
                  </Layer>
              </Stage>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
export default React.memo(ImgCompositContainer);
from aws_access import access_key, secret_key, region_name, service_name, agent_id, agent_alias_id

import boto3, logging, uuid

session_id = str(uuid.uuid4())
client = None

def set_boto3_client():
  global client
  client = boto3.client(
    service_name=service_name,
    region_name=region_name,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    verify=False
  )

def getMessage(question):
  response = client.invoke_agent(
    agentId=agent_id,
    agentAliasId=agent_alias_id,
    enableTrace=True,
    sessionId=session_id,
    inputText=question,
  )

  completion = ""
  for event in response.get("completion"):
    #Collect agent output.
    if 'chunk' in event:
        chunk = event["chunk"]
        completion += chunk["bytes"].decode()
    
    # Log trace output.
    if 'trace' in event:
      trace_event = event.get("trace")
      trace = trace_event['trace']
      for key, value in trace.items():
        logging.info("%s: %s",key,value)

  return completion

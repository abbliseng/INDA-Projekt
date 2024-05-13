import json
import boto3
from decimal import Decimal
from datetime import datetime

client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('events')
tableName = 'events'


def lambda_handler(event, context):
    print(event)
    body = {}
    statusCode = 200
    headers = {
        "Content-Type": "application/json"
    }

    try:
        # body = event['routeKey']
        # body = table.scan()
        # if event['routeKey'] == "DELETE /items/{id}":
        #     table.delete_item(
        #         Key={'id': event['pathParameters']['id']})
        #     body = 'Deleted item ' + event['pathParameters']['id']
        if event['routeKey'] == "GET /events/{id}":
            body = table.get_item(
                Key={'id': event['pathParameters']['id']})
            body = body["Item"]
            responseBody = [
                    {'event_date': body['event_date'], 'id': body['id'], 'event_name': body['event_name'], 'img': body['img']}
                ]
            body = responseBody
        elif event['routeKey'] == "GET /events":
            # body = "nono"
            body = table.scan()
            body = body["Items"]
            responseBody = []
            for items in body:
                responseItems = [
                    {'event_date': items['event_date'], 'id': items['id'], 'event_name': items['event_name'], 'img': items['img']}]
                responseBody.append(responseItems)
            body = responseBody
        elif event['routeKey'] == "GET /upcoming_events":
            body = table.scan()
            body = body["Items"]
            responseBody = []
            for items in body:
                responseItems = [
                    {'event_date': items['event_date'], 'id': items['id'], 'event_name': items['event_name'], 'img': items['img']}]
                if items['event_date'] >= str(datetime.now().date()):
                    responseBody.append(responseItems)
            body = responseBody
        elif event['routeKey'] == "PUT /events":
            requestJSON = json.loads(event['body'])
            table.put_item(
                Item={
                    'id': requestJSON['id'],
                    'event_date': requestJSON['event_date'],
                    'event_name': requestJSON['event_name'],
                    'img': requestJSON['img']
                })
            body = 'Put item ' + requestJSON['id']
    except KeyError:
        statusCode = 400
        body = 'Unsupported route: ' + event['routeKey']
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
             "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
        "body": body
    }
    return res
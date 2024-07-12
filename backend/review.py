from applicant import BaseApplicant
from openai import OpenAI
import json

client = OpenAI()

cheating_prompt = """
Your task is to check if the code is written by the applicant. Check if applicant copied project from internet. You are given the code in the text format. Your answer should be in the json format. Answer should be "YES" - applicant didnt cheat or "NO" - applicant did cheat. Examples:
-------- CODE --------
index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>
-------- ANSWER --------
{
    "answer": "YES",
    "reason": "Some reason"
}
"""

review_prompt = """
You are reviewer. Your task is to evaluate applications and determine whether candidates should proceed to the
next step. You are given applicant's data in the json format. Applicant should be able to code frontend or fast learn it and know bare minimum. Your answer also should be in the json format. Answer should be "YES", "NO" or "UNCERTAIN". Examples:
-------- APPLICATION --------
{
    "programming_skill_level": "Professional developer",
    "on_paid_basis": "TRUE",
    "programming_experience": "React, vue",
    "past_projects": "вебсайты для малых бизнесов",
    "achievements": "победитель хакатона от Министерства цифровизации"
}
-------- ANSWER --------
{
    "answer": "YES"
}
-------- APPLICATION --------
{
    "programming_skill_level": "Professional developer",
    "on_paid_basis": "FALSE",
    "programming_experience": "React, vue",
    "past_projects": "",
    "achievements": "Занял первое место по шахматам в соревнованиях"
}
-------- ANSWER --------
{
    "answer": "NO"
}
-------- APPLICATION --------
{
    "programming_skill_level": "Базовые знания программирования",
    "on_paid_basis": "FALSE",
    "programming_experience": "html, css, python",
    "past_projects": "",
    "achievements": "Призовые места в олимпиадах"
}
-------- ANSWER --------
{
    "answer": "NO"
}
"""

def normalized(data: BaseApplicant) -> dict:
    s = {}
    s["programming_skill_level"] = data["programming_skill_level"]
    s["programming_experience"] = data["programming_experience"]
    s["past_projects"] = data["past_projects"]
    s["achievements"] = data["achievements"]

    return s
    
def process_review(applicant: BaseApplicant):
    s = {}
    s["programming_skill_level"] = applicant["programming_skill_level"]
    s["programming_experience"] = applicant["programming_experience"]
    s["past_projects"] = applicant["past_projects"]
    s["achievements"] = applicant["achievements"]

    with open("feedbacks.txt", "r", encoding="utf-8") as f:
        feedbacks = f.read()
    
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": review_prompt + "\n" + "-------- TRAINING DATA --------" + "\n" + feedbacks},
            {"role": "user", "content": str(s)},
        ]
    )

    answer = response.choices[0].message.content

    try:
        return json.loads(answer)["answer"]
    except:
        print(answer)

    return "ERROR"

def cheating(content):

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": cheating_prompt},
            {"role": "user", "content": content},
        ]
    )

    answer = response.choices[0].message.content

    try:
        return json.loads(answer)
    except:
        print(answer)

    return "ERROR"
    

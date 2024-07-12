from dotenv import load_dotenv

load_dotenv()

from gh import print_repo
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select
from applicant import BaseApplicant
from gsheets import get_data, get_feedbacks, set_cell
from database import get_db
from review import process_review

async def lifespan(_):
    database = get_db()
    await database.connect()
    yield
    await database.disconnect()
    
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Table(BaseModel):
    table_url: str
    markers: BaseApplicant
    applicants_count: int

class Credentials(BaseModel):
    username: str
    password: str

class Github(BaseModel):
    link: str
    branch: str

@app.post("/excel/")
async def set_excel(table: Table):
    data = get_data(table.table_url, table.markers, table.applicants_count)

    cnt = 0
    for i, j in vars(table.markers).items():
        if j:
            cnt += 1

    set_cell(1, cnt + 2, "AI Review", table.table_url)
    set_cell(1, cnt + 3, "Mentors feedback", table.table_url)
    for i in range(len(data)):
        answer = process_review(data[i])
        set_cell(i + 2, cnt + 2, answer, table.table_url)

    return {"result": str(len(data))}

@app.post("/feedback/")
async def set_excel(table: Table):
    cnt = 0
    for i, j in vars(table.markers).items():
        if j:
            cnt += 1

    feedbacks = get_feedbacks(table.applicants_count, table.markers, table.table_url)
    with open("feedbacks.txt", "a", encoding="utf-8") as f:
        for i in range(len(feedbacks)):
            f.write(str(feedbacks[i]) + "\n")

    return {"result": "Ok"}

@app.post("/login/")
async def login(credentials: Credentials):
    print(credentials.username, credentials.password)
    if credentials.username == "admin" and credentials.password == "admin":
        return {"result": "Ok"}
    return {"result": "Error"}

@app.post("/github/")
async def github(gh: Github):
    return print_repo(gh.link, gh.branch)
    
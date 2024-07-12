import requests
import os

from review import cheating 


def print_repo(repo_url, branch):
    repo_name = repo_url.split("/")[-1]
    user_name = repo_url.split("/")[-2]

    res = requests.get(f"https://api.github.com/repos/{user_name}/{repo_name}/git/trees/{branch}?recursive=1")

    content = ""
    for i in res.json()["tree"]:
        if (i["path"].split(".")[-1] in ["py", "tsx", "css", "ts"]) and i["type"] == "blob":
            content += f"{i["path"]}\n"
            content += requests.get(f"https://raw.githubusercontent.com/{user_name}/{repo_name}/{branch}/{i["path"]}").text
            content += "\n\n"

    answer = cheating(content)
    return answer


from gspread import Client, service_account

def client_init_json() -> Client:
    return service_account(filename='credentials.json')

client = client_init_json()

def get_table_by_url(table_url):
    return client.open_by_url(table_url)

def get_table_by_id(table_url):
    return client.open_by_key(table_url)

def get_data(table_url, markers, applicants_count):
    table = get_table_by_url(table_url)

    result = []
    for i in range(2, applicants_count + 2):
        applicant_list = table.sheet1.row_values(i)

        applicant = {}
        for name, value in vars(markers).items():
            if (value == None):
                continue
            try: 
                applicant[name] = applicant_list[int(value)]
            except:
                print("Error", name, value)

        result.append(applicant)
    return result

def set_cell(row, col, value, table_url):
    table = get_table_by_url(table_url)
    table.sheet1.update_cell(row, col, value)

def get_feedbacks(count, markers, table_url):
    table = get_table_by_url(table_url)
    vals = []
    for i in range(2, count + 2):
        data = table.sheet1.row_values(i)

        mx = 0
        applicant = {}
        for name, value in vars(markers).items():
            if (value == None):
                continue
            try: 
                applicant[name] = data[int(value)]
            except:
                print("Error", name, value)
            mx = max(mx, int(value))

        applicant["your_answer"] = data[mx + 1] if mx + 1 < len(data) else ""
        applicant["mentors_feedback"] = data[mx + 2] if mx + 2 < len(data) else ""
        vals.append(applicant)

    return vals
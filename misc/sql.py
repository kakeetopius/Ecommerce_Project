import json


json_file = open("text.json", 'r');
json_cont = json.load(json_file)


with open("data.sql", 'w') as sql_file:
    sql_file.write("INSERT INTO Category\n")
    sql_file.write("VALUES\n")
    index = 1

    for product in json_cont:
        season = product['season']

        if season == "fall":
            season = "autumn"
        elif season == "all":
            season = "NULL"

        category = product['category']
        
        if category == "women":
            gender = "F"
            age_group = "adult"
        elif category == "men":
            gender = "M"
            age_group = "adult"
        elif category == "kids-boy":
            gender = "M"
            age_group = "kids"
        elif category == "kids-girl":
            gender = "F"
            age_group = "kids"
        elif category == "unisex":
            gender = "NULL"
            age_group = "NULL"
        elif category == "kids":
            gender = "NULL"
            age_group = "kids"
        
        query = f"({index}, \'{gender}\', \'{season}\', \'{age_group}\'),\n"
        sql_file.write(query);        
        index = index + 1

json_file.close()

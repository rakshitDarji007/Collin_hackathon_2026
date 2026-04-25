#List
tasks_list = []

#Ask users how mnay taks they wanna add
numTasks=int(input ('How many tasks would you like to add: '))
# For loop to ask numTasks many wha task they wanna add
for i in range(numTasks):
    items=input(f"Enter item {i+1}: ")
    #Add that task to list
    tasks_list.append(items)
#Print final code
print("Your final list: "," ".join(tasks_list))
    
    

    

    

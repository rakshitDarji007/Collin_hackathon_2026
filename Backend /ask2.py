StoreUserInput = []
counter = 0

#asking for user input
print('Hello\n')   

while True:
    HowMany = int(input('How many task would you to do today?\n')) #ask how many task
    print(f'You are doing {HowMany} tasks!\n') #letting user knnow how many tasks used
    
    userInput = input('What task would you like to start today?\n')
    if userInput == "done":
        break
    StoreUserInput.append(userInput)
    
    
    counter += HowMany #store amount
    


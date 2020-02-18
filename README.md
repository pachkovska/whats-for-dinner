# What's For Dinner

### Decsription:   
Application that allows users to put in meal or specific ingdridient and will show estimated calorie count of the meal. It will also allow users to save their previous meals or favourite meals.

### Name options:   
- Whats for dinner
- Calorie ninja
- Calcultate your dinner

### Tech Stack used:   
- React
- MongoDB
- Express.js
- CSS
- USDA Public API to search for foods and display calorie count
 
### Roles:  
- Designer / UI engineer - Win
- Front-end Engineer - David
- Front-end API Engineer - Yulia

### Potential challenges:
- User authorization
- USDA API has calorie count only for packaged foods, for generic things like 'raw broccoli' it returns nutrition informatin only and no calorie count. Also to get a calorie count for a single food, we have to make 2 separate GET requests: 1st to get list of potential foods user is looking for, parse out their database id for the searched food; 2nd GET request will actually get calorie count and nutrition information for the specififed database id that is returned by 1st request

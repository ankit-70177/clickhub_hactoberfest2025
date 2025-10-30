# voting_eligibility.py
# Checks if a person can vote

print("🗳️ Voting Eligibility Checker")

age = int(input("Enter your age: "))

if age >= 18:
    print("You are eligible to vote ✅")
elif age >= 0:
    print("You are not eligible to vote ❌")
else:
    print("Invalid age! 🚫")

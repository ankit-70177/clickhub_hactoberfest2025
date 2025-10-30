# number_checker.py
# A simple program to check if a number is positive, negative, or zero.

print("🔢 Positive or Negative Number Checker")

num = int(input("Enter a number: "))

if num > 0:
    print(f"{num} is positive ✅")
elif num < 0:
    print(f"{num} is negative ⚡")
else:
    print("The number is zero 🟡")

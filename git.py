import sys
import os
import subprocess


branch = "dencelman"
dir_path = os.path.join("Users", "dencelman", "Desktop", "prod_comp", "anyback")

available_args = ['pull', 'merge']


def cmd(command: str) -> str:
    print(f"> {command}")

    result = subprocess.run(command, shell=False, capture_output=True, text=True)
    out = result.stdout

    print(f"< {out}")
    return out




def pull():
    # load updates from dencelman
    cmd(f"git checkout {branch}")
    cmd(f"git pull origin {branch}")

    # load from main to dencelman
    cmd("git merge main")
    cmd(f"git push origin {branch}")


def merge():
    # from dencelman to main
    cmd("git checkout main")
    cmd(f"git merge {branch}")
    cmd(f'git commit -m "update from {branch} to main"')
    cmd("git push origin main")


def warn_available_args():
    print("Available commands:")
    for arg in available_args:
        print(f"python git.py {arg}")
    sys.exit(0)


def check_arg(arg):
    if (
        (len(sys.argv) <= 1)
        or 
        (arg not in available_args)
    ):
        warn_available_args()
    
    

def main():
    arg = sys.argv[1]
    check_arg(arg)
    os.chdir(dir_path)

    method = globals()[arg]
    method()
    
main()

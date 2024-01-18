import sys
import os
import subprocess


branch = "simon"

dir_path = os.path.dirname(os.path.abspath(__file__))

available_args = ['pull', 'merge']

def cmd(command: str) -> str:
    print(f"> {command}")

    result = subprocess.run(command, shell=False, capture_output=True, text=True)
    out = result.stdout

    print(f"< {out}")
    return out




def pull():
    # load updates from dencelman
    cmd(f"/usr/bin/git checkout {branch}")
    cmd(f"/usr/bin/git pull origin {branch}")

    # load from main to dencelman
    cmd("/usr/bin/git merge main")
    cmd(f"/usr/bin/git push origin {branch}")

def merge():
    # from dencelman to main
    cmd("/usr/bin/git checkout main")
    cmd(f"/usr/bin/git merge {branch}")
    cmd(f'/usr/bin/git commit -m "update from {branch} to main"')
    cmd("/usr/bin/git push origin main")


def warn_available_args():
    print("Available commands:")
    for arg in available_args:
        print(f"python git.py {arg}")
    sys.exit(0)


def check_arg():
    if len(sys.argv) <= 1:
        warn_available_args()
    
    arg = sys.argv[1]

    if (arg not in available_args):
        warn_available_args()


def main():
    check_arg()
    os.chdir(dir_path)
    arg = sys.argv[1]
    method = globals()[arg]
    method()
    
main()

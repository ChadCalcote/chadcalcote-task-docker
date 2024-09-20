# chadcalcote-task-docker

This is an Encryption task with encrypt and decrypt functionality. It has Docker containerization capabilities and is built using TypeScript.

These are the variables used from the provided requirements:

Ciphertext: `f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA==`

Encryption key: `risk3sixty`

**Table of Contents**
  * [Requirements Met](#Requirements-Met)
  * [Extras](#Extras)
  * [Testing the Deliverable](#Testing-the-Deliverable)

## Requirements Met

1. `decrypt` function is written inside of the [Encryption.ts file](https://github.com/ChadCalcote/chadcalcote-task-docker/blob/master/src/libs/Encryption.ts) and later used in the [decryptString.ts file](https://github.com/ChadCalcote/chadcalcote-task-docker/blob/master/src/decryptString.ts) in the src/ directory. This is the inverse of our `encrypt` function. The decryption process takes the same secret key (private) and ciphertext as input to decipher the original data.
  
2. The source code from [candidate-task-docker](https://github.com/risk3sixty/candidate-task-docker), provided in TypeScript and built/executed in a Node.js environment, is being used for this project.
   
3. The final deliverable is created in this repository with a `Dockerfile` located [here](https://github.com/ChadCalcote/chadcalcote-task-docker/blob/master/Dockerfile). Instructions to build and run the container, thus executing the `decrypt` function, are located in the [Testing the Deliverable](#Testing-the-Deliverable) section below.

## Extras

While working on the coding challenge, I chose to document what the code is doing to help understand the functionality better and provide more insight into my approach to solving technical problems.

This documentation can be found in the [Encryption.md file](https://github.com/ChadCalcote/chadcalcote-task-docker/blob/master/src/libs/Encryption.md) as well as comments in the code.

A typings.ts file was created for typings and interfaces located at [typings.ts](https://github.com/ChadCalcote/chadcalcote-task-docker/blob/master/src/libs/typings.ts)

## Testing the deliverable

To test the deliverable, please follow the steps below in your terminal:

1. `git clone https://github.com/ChadCalcote/chadcalcote-task-docker.git`

2. `cd chadcalcote-task-docker` 
 
3.  `docker build -t chadcalcote .`

4.  `docker run -e ciphertext=f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA== chadcalcote`

5. The execution of the container should print to the screen the decrypted plain text of the solution.

```sh
chadcalcote-task-docker % docker run -e ciphertext=f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA== chadcalcote

> chadcalcote-task-docker@0.0.1 start
> node dist/decryptString.js

r3s is m00ning
```

# chadcalcote-task-docker

This is an Encryption task with encrypt and decrypt functionality. It has Docker containerization capabilities and is built using TypeScript.

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

This documentation can be found in .md files as well as comments in the code.

Ciphertext: `f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA==`

Encryption key: `risk3sixty`

## Testing the deliverable

When you provide us your final deliverable repository (this can be a tarball of source code, GitHub repo, GitLab, etc.), we will execute the following steps to confirm the solution is adequate:

1. If you provide a GitHub/GitLab repo, we will `git clone ...` this repo. If you provide a tarball we will untar it, `$ tar -xf yourRepo.tgz`

2. We will `cd` into the directory and build an image, `docker build -t r3sCandidate .`

3. We will run the image with `docker run ... r3sCandidate`. NOTE: it's totally fine if we need to provide extra parameters to the `docker run` command like environment variables or override the default command. Just let us know what should be added and we can ensure they're present in the command.

4. The execution of the container should print to the screen the decrypted plain text of the solution. Here's an example:

```sh
MAC-SR:docker-encryption lancewhatley$ docker run [?EXTRA_PARAMS] r3sCandidate [?OVERRIDDEN_COMMAND]


> candidate-task-docker-solution@0.0.1 start /usr/encryption
> node dist/decryptString.js

[DECRYPTED_PLAIN_TEXT_SHOULD_SHOW_HERE]
```

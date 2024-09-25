# Encryption and Decryption

Helpful information and documentation regarding encryption and decryption.

**Table of Contents**
   * [Glossary](#glossary)
   * [crypto](#crypto)
   * [What is Encryption?](#What-is-Encryption?)
   * [What is Decryption?](#What-is-Decryption?)
   * [What is the cipher algorithm?](#What-is-the-cipher-algorithm?)
   * [What is hashing?](#What-is-hashing?)
   * [Block Cipher and CTR Mode](#Block-Cipher-and-CTR-Mode)

## Glossary

Counter - initial counter incremented after each intermediate result until overflow.

Initialization Vector (IV) - 128 bits longs, includes nonce and initial counter.

Container - Loosely isolated environment

## crypto

Built-in Node module providing cryptographic functions.

More information found [here](https://nodejs.org/api/crypto.html)
Extra information found [here](https://metaschool.so/articles/nodejs-crypto-module/)

## What is Encryption?

Cybersecurity method protecting data by scrambling it using math modals so only authorized parties can access it.

Converts readable data into an unreadable format called ciphertext.

Only those with the key to decrypt the data can access the original information.

## What is Decryption?

Process of converting encrypted data back into its original, readable form.

[Encryption and Decryption Doc](https://docs.oracle.com/cd/E19047-01/sunscreen151/806-5397/i996724/index.html#:~:text=Encryption%20is%20the%20process%20by,its%20original%20(readable)%20format.)

## What is the cipher algorithm?

A set of instructions that transforms data into an unrecognizable form, called ciphertext, to protect sensitive information.

## What is hashing?

Hashing is a method to convert plain text to encrypted/cipher text.

You cannot recover original text from cipher text.

You can regenerate the exact cipher text from the original text.

## Block Cipher and CTR Mode

Data is encrypted and decrypted by XORing with the key stream produced by AES.

Key stream precomputation - key stream is precomputed once iv and nonce are assigned.

CTR is a Block cipher mode of operation using block cipher algorithm

AES Processing Ability

Cipherkey length for AES is 256.

Limitation - working mode works on units fixed sizd (128 bits for 1 block), but text in real world has a variety of lengths.

Last block of text provided to this primitive must be padded to 128 bits before encryption or decryption .

IV is random in our case so it can be combined with the counter using an invertible operation to produce unique counter block for encryption.

Key is constant when you use CTR.

IV affects the cipher input, so the keystream varies.

The decrypter will know both the key and the IV.

They can calculate the same function as the encrypter did, resulting in the same keystream block, which a XOR cancels out.

Block cipher consists of two paired algorithms, one for encryption and another for decryption

Both encryption and decryption algorithms accept two inputs: input block and key (which we get off secret)

[Understanding CTR Mode](https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/ctr.html)

[CTR Mode](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CTR)

## (AES) 256 CTR Mode

Key size - 256 bits, which makes it difficult to crack

Encryption and decryption - use same key

Counter - User chooses an initial counter that increases with each intermediate result until it overflows

Nonce - random number part of the IV

Output - XORed (exclusive or), bitwise operator that compares two input bits to produce a single output bit.

CTR mode allows for encryption and decryption to be performed in parallel

## What is Docker?

Open platform for developing, shipping, and running applications.

Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

Manage infrastructure in the smae ways you manage your applications.

Significantly reduce delay between writing code and running it in production.

Isolation and security lets you run many containers simultaneously on a given host.

Containers are lightweight and contain everything you need to run the application. No need to rely on what's installed on the host.

Docker's uses:

[Docker Docs](https://docs.docker.com/get-started/docker-overview/)

- Fast, consistent delivery of your applications

   Scenarios:

   - Developers write code locally and share their work with colleagues using Docker containers.

   - Use Docker to push apps to test environment and run automated and manual tests.

   - When developers find bugs, they can fix them in dev environment and redeploy them to test environment for testing and validation.

   - When testing is done, it is as simple as pushing the fux in an updated image to the production environment

- Responsive deployment and scaling

- Running more workloads on the same hardware

Architecture

Docker client talks to Docker daemon

daemon does heavy lifting of building, running, and distributing Docker containers

daemon and client communciate using REST API over network interface

Docker daemon

listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes

A daeomon also communicates with other daemons to manage Docker services

Docker client

primary way for users to interact with Docker

When user uses commands such as docker run, client sends these commands to dockerd (daemon), which carries them out.

docker command uses the Docker API

Docker Desktop

application for your machine

Includes the daemon and the Docker client

Docker registries

Docker registries store Docker images

Docker Hub is a public registry anyone can use and Docker looks for images on Docker Hub by default

Docker objects

Images - read-only template with instructions for creating a Docker container

Standardized package that contains everything you need to run an application, including its files, configuration, and dependencies

Often an image is based on another image, with additional customization

A Dockerfile with simple syntax defines the steps needed to create the image and run it

Each instruction creates a layer in the image

When you change the Dockerfile, and rebuild the image, only the laters changed are rebuilt

This is what makes image lightweight, small, and fast

Containers - runnable instance of an image

A container is defined by its image as well as configuration option you provide to it when you create or start it.

Docker is written in Go and takes advantage of features of the Linux kernel to deliver its functionality.

Steps:

docker build -t chadcalcote .

-t is for name flage
Build an image with name chadcalcote from the Dockerfile in the current working directory

docker run -e ciphertext=f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA== chadcalcote

Create and run a new container from chadcalcote image while setting the ciphertext environment variable to f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA==

What I would do differently:

Chose to do environment variables as they are more clear in their usage and can be easily used in a node js environment. 

Write more tests. Knowing how something fails is just as important as how something succeeds

Pass secret key as an environmant variable as well

Pass the environment variables directly in the Dockerfile to eliminate possibility of putting in ciphertext incorrectly

Build arguments are only available when building the image

Build Arguments vs. Environment Variables

Both serve as a means to pass infomrmation into the build process

You can use them to parameterize the build, allowing for more flexible and configurable builds.

Inappropriate for passing secrets to your build, because they're epxosed in the final image

Use secret mounts or SSH mounts for this

Both can be declared in Dockerfile

Both can be used to parameterize the build

Build arguments

Variables for the Dockerfile itself

You might use a build argument to specify the version of a dependency to install

They have no effect on a build unless used in an instruction

Most commonly used to specify versions of components

Environment Variables

Environment variables you set persist in containers and using them can lead to unintended side-effects for the app's runtime.





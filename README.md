# Summer-CS445
Colin Brennan

## Configuration Instructions
This repository can be cloned to a target computer with the following command.
```
git clone https://github.com/cbrennan1/Summer-CS445
```
Once cloned the repository can be entered with the following command. 
```
cd Summer-CS445
```

## Build and Deploy Instructions
Once inside the cloned repository the 'run.sh' script must have it's permissions changed before it can be run.
```
sudo chmod 777 run.sh
./run.sh
```

## Where to Find Generated Coverage HTML File After Run Script Deploys Application
Coverage HTML file can be found after running the 'run.sh' script at the following directory path.  This file is remade everytime the command 'npm run test:cov' is ran.
```
Summer-CS445/rest-api/coverage/lcov-report/index.html
```

## Copyright and Licensing
I have not gotten this code to be copyrighted. As such it is in a public GitHub Repository and is open source.  Please give credit if utilizing this code.

## Known Bugs
- Fails Postman Test: #67 - Get report <rid2> viewed by <uid2>.  Not deeply equal for some reason.
- Fails Postman Test: #71 - Verify that conversation(s) associated with <aid2> has been removed.  Not removed correctly, still returns 200.

## References And Research
- https://zetcode.com/javascript/axios/
- https://medium.com/@etiennerouzeaud/-how-create-an-api-restfull-in-express-node-js-without-database-b030c687e2ea
- https://docs.nestjs.com/recipes/crud-generator
- https://www.thisdot.co/blog/introduction-to-restful-apis-with-nestjs
- https://www.joshmorony.com/sending-data-with-post-requests-to-a-nestjs-backend/
- https://www.youtube.com/watch?v=dXOfOgFFKuY
- https://www.youtube.com/watch?v=GHTA143_b-s
- https://www.youtube.com/watch?v=F_oOtaxb0L8 
- https://www.youtube.com/watch?v=2n3xS89TJMI
- https://tsmx.net/jest-full-code-coverage/#Example_function_to_test 
- https://javascript.tutorialink.com/getting-typeerror-res-status-is-not-a-function/
- https://stackoverflow.com/questions/70096543/nest-cant-resolve-dependencies-of-the-httpservice-please-make-sure-that-th
- https://stackoverflow.com/questions/50992518/how-can-i-ignore-a-file-pattern-for-jest-code-coverage 
- https://idiallo.com/javascript/uncaught-typeerror-cannot-read-property-of-null
- https://eloquentcode.com/istanbul-ignore-syntax-for-jest-code-coverage
- https://medium.com/dlt-labs-publication/unit-testing-jest-with-nestjs-b5b043ac5598

## Credit and Acknowledgments
Aside from the above links used for research (which included tutorials on how to create NestJS Restful API's) I also had help understanding how NestJS operates and REST API's from several family members that work in the code quality field.  I also would like to acknowledge several of my fellow students for taking the time with me this semester to help review/debug certain lines of the code that I was struggling on.  I also have to give credit to the tutoring programs that IIT offers as I was able to ask questions to CS students/tutors that they were taught but wasn't really gone into detail in the ITM degree.

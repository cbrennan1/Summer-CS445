export interface ThanksModel {
    uid: number;
    tid: number|null;
    thank_to: number;
    description: string;
    date_created: string|Date|null;
}

//Model Based off Provided Expected Response: http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/test-data/test-thanks-create-thank-POST-1-response.json

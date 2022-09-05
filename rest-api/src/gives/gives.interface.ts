export interface GivesModel {
    uid: number;
    gid: number;
    type: string;
    description: string;
    start_date: string;
    end_date: string;
    extra_zip: [string, string];
    is_active: boolean;
    date_created: string|Date|null;}

//Model Based off Provided Expected Response: http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/test-data/test-gives-create-give-POST-1-response.json

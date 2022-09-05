export interface NotesModel {
    uid: number;
    nid: number;
    to_type: string;
    to_user_id: number;
    to_id: number;
    description: string;
    date_created: string|Date|null;
}

//Model Based off Provided Expected Response: http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/test-data/test-notes-create-note-POST-1-response.json

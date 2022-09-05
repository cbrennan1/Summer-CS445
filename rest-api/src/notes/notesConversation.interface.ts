export interface NotesConversationModel {
    uid: number,
    source_id: number,
    conversations: {
        with_uid: number,
        notes: {
            uid: number,
            nid: number,
            to_type: string,
            to_user_id: number,
            to_id: number,
            description: string,
            date_created: Date|string
        }[]
    }[]
}

//Model Based Off Provided Expected Response: http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/test-data/test-notes-view-notes-GET-1-response.json

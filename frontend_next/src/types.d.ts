interface Message {
    sender: string,
    message: string
}

interface Data {
    name: string,
    email: string,
    phone: string,
    school: string,
    major: string,
    gradYear: string,
    experience: string,
    workshops: number[]
}

interface ChatData extends Data {
    workshops: string
}

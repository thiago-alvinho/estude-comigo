import vine from '@vinejs/vine'

const enrollmentValidator = vine.create({
    key: vine
        .string()
        .trim()
        .minLength(1)
        .maxLength(255)
})

export default enrollmentValidator
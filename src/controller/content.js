
const contentModal = require('../core/usecases/content')

const getContent = async () => {
    let userData = contentModal.getContent();
    return userData;
}

const addContent = async (Content) => {
    let ContentData = {
        title: Content.title,
        body: Content.body,
        image: Content.image,
        alt: Content.alt,
        author: Content.author,
        date: Content.date,
        like: Content.like,
        comment: Content.comment,
    }
    let saveContent = await contentModal.addContent(ContentData);
    return saveContent;

}

const updateContent = async (id, userData) => {
    let updateContent = await contentModal.updateContent(id, userData);
    return updateContent;
}

const deleteContent = async (id) => {
    let deleteContent = await contentModal.deleteContent(id);
    return deleteContent;
}

module.exports = {
    addContent, getContent, updateContent, deleteContent
}
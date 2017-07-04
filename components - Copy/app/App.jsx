import React, {Component} from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'
import MainSection from './main/MainSection.jsx'
import ModalWrapper from './pops/ModalWrapper.jsx'
import 'whatwg-fetch'
import Notification from 'rc-notification'
const notification = Notification.newInstance({})

const CLIENT_DOMAIN = 'http://hugito.surge.sh'
const SERVER_DOMAIN = 'http://138.197.15.62:4005'
const ACCESS_TOKEN = localStorage.getItem('access_token')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: 'false',
            loggedIn: 'true',
            user: {
                name: '',
                email: '',
                login: ''
            },
            selectedRepository: {},
            repositoryIsValid: 'false',
            validRepositories: {
                names: []
            },
            treeMenu: [],
            activeMenuItem: '',
            contentElements: [],
            currentEditingContentElement: {},
            showContent: 'false',
            showContentEditor: 'false',
            fileName: '',
            notification: {
                isActive: 'false',
                message: '',
                dismissAfter: 1,
                style: 'true',
                isSuccess: 'true'
            },
            modal: {
                show: 'false',
                title: '',
                fieldNames: [
                    {
                        value: ''
                    }
                ],
                closeButton: '',
                saveButton: ''
            }
        }
        this.getUser()
    }
    getUser() {
        fetch(SERVER_DOMAIN + "/user" + "?accessToken=" + ACCESS_TOKEN, {
            method: 'POST'
        })
        .then(this.handleFetchErrors)
        .then(response => response.json())
        .then(user => user = this.onSetUser(user))
        .catch(error => this.onError("Unnable to retrieve user"))
    }
    onSetUser(user) {
        this.setUser(user);
    }
    logout() {
        localStorage.removeItem('authentication_authenticated');
        localStorage.removeItem('access_token')
        localStorage.removeItem('authentication_state')
        window.open(CLIENT_DOMAIN, '_self');
    }
    validateRepository(name, branches) {
        const selectedRepository = {
            name: name,
            projectBranch: branches.projectBranch,
            publicBranch: branches.publicBranch
        }
        this.setSelectedRepository(selectedRepository);
        fetch(SERVER_DOMAIN + "/repository" + "?name=" + name + "&projectBranch=" + branches.projectBranch + "&publicBranch=" + branches.publicBranch + "&accessToken=" + ACCESS_TOKEN, {
            method: 'GET'
        })
        .then(this.handleFetchErrors)
        .then(response => this.onRepositoryValidation())
        .catch(error => this.onError("Unnable to validate repository"))
    }
    onRepositoryValidation() {
        this.setRepositorieIsValid('true');
        this.addValidRepository();
        this.buildRepositoryTree();
        notification.notice({
            content: <span>Webpage is ready</span>,
            duration: 1.5,
            style: {background: 'rgba(104, 219, 160, 0.7)', color: '#ffffff'},
        });
    }
    addValidRepository() {
        let {selectedRepository, validRepositories} = this.state;
        validRepositories.names.push(selectedRepository.name)
        this.setValidRepositories(validRepositories);
    }
    buildRepositoryTree() {
        let {validRepositories, selectedRepository} = this.state;
        let {treeMenu} = this.state;
        for (var i = 0; i < validRepositories.names.length; i++) {
            let navList = [
                {
                    icon: 'fa fa-pencil',
                    id: validRepositories.names[i],
                    text: 'Page Content'
                }
            ];
            let id= validRepositories.names[i];
            let text = validRepositories.names[i];
            let treeEntry = {
                id: id,
                icon: 'fa fa-cube',
                text: text,
                navlist: navList
            };
            treeMenu.push(treeEntry);
        }
        this.setState({treeMenu})
    }
    setActiveMenuItem(activeMenuItem) {
        this.setState({activeMenuItem});
        this.listContent(this.state.selectedRepository, "content/post");
    }
    createContent(fileName, title, path) {
        // By default the content is created inside content/post folder. For now
        // this is the support offered. In the future more folders should be
        // added. There is a confusion between fileName and title. It should be
        // fixed both in the frontend and in the backend.
        let {user, selectedRepository} = this.state;
        const data = {
            repositoryName: selectedRepository.name,
            projectBranch: selectedRepository.projectBranch,
            title: fileName,
            body: this.fillMetaData(title, "true"),
            path: path,
            accessToken: ACCESS_TOKEN
        }
        fetch(SERVER_DOMAIN + "/content", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(this.handleFetchErrors)
        .then(response => response.json())
        .then(content => content = this.onCreateContent(content))
        .catch(error => this.onError("Unnable to create content"))
        notification.notice({
            content: <span>Creating Your Content...</span>,
            key: 'creating',
            duration: null,
            style: {background: 'rgba(247, 198, 65, 0.7)', color: '#ffffff'},
        });
    }
    onCreateContent(content) {
        let {selectedRepository} = this.state;
        notification.notice({
            content: <span>Content Created Successfully!</span>,
            duration: 1.5,
            style: {background: 'rgba(104, 219, 160, 0.7)', color: '#ffffff'},
            onClose() {
                notification.removeNotice('creating')
            },
        });
        // Sync UI with server
        this.listContent(selectedRepository, content.path);
    }
    removeContent(contentElement) {
        let {selectedRepository} = this.state;
        const data = {
            repositoryName: selectedRepository.name,
            title: contentElement.header,
            path: contentElement.path,
            projectBranch: selectedRepository.projectBranch,
            accessToken: ACCESS_TOKEN
        }
        fetch(SERVER_DOMAIN + "/content", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(this.handleFetchErrors)
        .then(response => this.onRemoveContent())
        .catch(error => this.onError("Unnable to remove content"))
        notification.notice({
            content: <span>Removing Your Content...</span>,
            key: 'removing',
            duration: null,
            style: {background: 'rgba(247, 198, 65, 0.7)', color: '#ffffff'},
        });
    }
    onRemoveContent() {
        let {selectedRepository} = this.state;
        notification.notice({
            content: <span>Content Removed Successfully</span>,
            duration: 1.5,
            style: {background: 'rgba(104, 219, 160, 0.7)', color: '#ffffff'},
            onClose() {
                notification.removeNotice('removing')
            }
        });
        this.listContent(selectedRepository, "content/post");
    }
    saveContent() {
        let {selectedRepository, currentEditingContentElement} = this.state;
        let data = {
            repositoryName: selectedRepository.name,
            projectBranch: selectedRepository.projectBranch,
            publicBranch: selectedRepository.publicBranch,
            title: currentEditingContentElement.title,
            path: currentEditingContentElement.path,
            body: currentEditingContentElement.header + currentEditingContentElement.body,
            accessToken: ACCESS_TOKEN
        }
        fetch(SERVER_DOMAIN + "/content", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(this.handleFetchErrors)
        .then(response => this.onSaveContent())
        .catch(error => this.onError("Unnable to save content :("))
        notification.notice({
            content: <span>Saving...</span>,
            key: 'saving',
            duration: null,
            style: {background: 'rgba(247, 198, 65, 0.7)', color: '#ffffff'},
        });
    }
    onSaveContent() {
        notification.notice({
            content: <span>Content Saved!</span>,
            style: {background: 'rgba(104, 219, 160, 0.9)', color: '#ffffff'},
            duration: 1.5,
            onClose() {
                notification.removeNotice('saving')
            }
        });
    }
    publishContent() {
        let {selectedRepository, currentEditingContentElement} = this.state;
        let data = {
            repositoryName: selectedRepository.name,
            projectBranch: selectedRepository.projectBranch,
            publicBranch: selectedRepository.publicBranch,
            title: currentEditingContentElement.title,
            path: currentEditingContentElement.path,
            body: this.unsetDraft(currentEditingContentElement.header) + currentEditingContentElement.body,
            accessToken: ACCESS_TOKEN
        }
        fetch(SERVER_DOMAIN + "/content/publish", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(this.handleFetchErrors)
        .then(response => this.onPublishContent())
        .catch(error => this.onError("Unnable to publish content :("))
        notification.notice({
            content: <span>Publishing... May take a while</span>,
            key: 'publishing',
            duration: null,
            style: {background: 'rgba(247, 198, 65, 0.7)', color: '#ffffff'},
        });
    }
    onPublishContent() {
        notification.notice({
            content: <span>Content Published!</span>,
            style: {background: 'rgba(104, 219, 160, 0.9)', color: '#ffffff'},
            duration: 1.5,
            onClose() {
                notification.removeNotice('publishing')
            }
        });
    }
    /**
     * List the content for a given repository at a given path.
     *
     * @param {any} repository is the HUGO repository
     * @param {any} path is the path to list
     *
     * @memberOf App
     */
    listContent(repository, path) {
        fetch(SERVER_DOMAIN + "/content" + "?repositoryName=" + repository.name + "&projectBranch=" + repository.projectBranch + "&path=" + path + "&accessToken=" + ACCESS_TOKEN, {
            method: 'GET'
        })
        .then(this.handleFetchErrors)
        .then(response => response.json())
        .then(contents => contents = this.onListContent(contents))
        .catch(error => this.onError("Unnable to list content titles"))
    }
    onListContent(contents) {
        let {showContent} = this.state;
        let contentElements = [];
        contents.forEach((content) => {
            let contentElement = {
                header: content.title,
                path: content.path,
                repositoryName: content.repositoryName,
                author: '',
                date: ''
            };
            contentElements.push(contentElement);
        })
        this.setState({showContent: 'true'})
        this.setContentElements(contentElements);
    }
    getFileContent(fileName, path) {
        let {selectedRepository} = this.state;
        fetch(SERVER_DOMAIN + "/content" + "/fileName" + "?repositoryName=" + selectedRepository.name + "&projectBranch=" + selectedRepository.projectBranch + "&path=" + path + "&title=" + fileName + "&accessToken=" + ACCESS_TOKEN, {
            method: 'GET'
        })
        .then(this.handleFetchErrors)
        .then(response => response.json())
        .then(content => content = this.onSetContent(content))
        .catch(error => this.onError("Unnable to list content titles"))
        notification.notice({
            content: <span>Getting Your File Content</span>,
            key: "getcontent",
            style: {background: 'rgba(247, 198, 65, 0.7)', color: '#ffffff'},
            duration: 1.5,
        });
    }
    onSetContent(content) {
        let data = {
            repositoryName: content.repositoryName,
            projectBranch: content.projectBranch,
            title: content.title,
            path: content.path,
            author: content.commit.name,
            date: content.createdAt,
            header: this.filterContentBody(content.body),
            body: this.filterContentHeader(content.body)
        }
        this.setShowContent('false');
        this.setShowContentEditor('true');
        this.setFileName(data.title);
        this.setCurrentEditingContent(data);
        notification.notice({
            content: <span>Content fetched Successfully</span>,
            onClose(){
                notification.removeNotice("getcontent")
            },
            style: {background: 'rgba(104, 219, 160, 0.7)', color: '#ffffff'},
            duration: 1.5,
        });
    }
    // Fills hugo metadata header. For now this is done client side. However a
    // possibility to use it on the server side should be explored.
    fillMetaData(title, draft) {
        const date = new Date(Date.now()).toISOString();
        return '+++\r\n\r\nCategories = [] Description = \"\" Tags = [] date = \"' + date + '\" menu = \"main\" draft = \"' + draft + '\" title = \"' + title + '\"\r\n\r\n+++\r\n\r\n'

    }
    // Content is no longer a draft and will be up on the public website.
    unsetDraft(header) {
        let filter = /(draft = \"true\")/g
        return header.replace(filter, 'draft = \"false\"')
    }
    filterContentBody(content) {
        let filter = /[+++]\W+[\s\S]*[+++]\W+\n/g
        let contents = content.match(filter)
        return contents[0]
    }
    filterContentHeader(content) {
        let filter = /[+++]\W+[\s\S]*[+++]\W+\n/g
        content = content.replace(filter, '')
        return content
    }
    setConnected(connected) {
        this.setState({connected});
    }
    setUser(user) {
        this.setState({user});
    }
    setSelectedRepository(selectedRepository) {
        this.setState({selectedRepository});
    }
    setValidRepositories(validRepositories) {
        this.setState({validRepositories});
    }
    setRepositorieIsValid(repositoryIsValid) {
        this.setState({repositoryIsValid});
    }
    setShowContent(showContent) {
        this.setState({showContent});
    }
    setContentElements(contentElements) {
        this.setState({contentElements});
    }
    setShowContentEditor(showContentEditor) {
        this.setState({showContentEditor});
    }
    setFileContent(currentEditingContentElement) {
        this.setState({currentEditingContentElement});
    }
    setCurrentEditingContent(currentEditingContentElement) {
        this.setState({currentEditingContentElement});
    }
    setFileName(fileName) {
        this.setState({fileName});
    }
    setModal(modal) {
        this.setState({modal});
    }
    onError(error) {
        notification.notice({
            content: <span>{error}</span>,
            duration: 1.5,
            style: {background: 'rgba(227, 94, 98, 0.7)', color: '#ffffff'},
        });
    }
    handleFetchErrors(response) {
        console.log("R: ", response)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    render() {
        return (
            <div>
                <TopbarSection
                    user={this.state.user}
                    setUser={this.setUser.bind(this)}
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    fileName={this.state.fileName}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setModal={this.setModal.bind(this)}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    logout={this.logout.bind(this)}
                    publishContent={this.publishContent.bind(this)}
                    saveContent={this.saveContent.bind(this)}/>
                <SidebarSection
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    activeMenuItem={this.state.activeMenuItem}
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    treeMenu={this.state.treeMenu}
                    validateRepository={this.validateRepository.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setShowContent={this.setShowContent.bind(this)}
                    listContent={this.listContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    setModal={this.setModal.bind(this)}/>
                <MainSection
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    contentElements={this.state.contentElements}
                    repositoryIsValid={this.state.repositoryIsValid}
                    listContent={this.listContent.bind(this)}
                    selectedRepository={this.state.selectedRepository}
                    removeContent={this.removeContent.bind(this)}
                    currentEditingContentElement={this.state.currentEditingContentElement}
                    getFileContent={this.getFileContent.bind(this)}
                    setFileContent={this.setFileContent.bind(this)}/>
                <ModalWrapper
                    modal={this.state.modal}
                    setModal={this.setModal.bind(this)}
                    createContent={this.createContent.bind(this)}
                    validateRepository={this.validateRepository.bind(this)}/>
            </div>
        )
    }
}

export default App

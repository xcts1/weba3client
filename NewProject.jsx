import React, { Component } from 'react'
import axios from 'axios'
const url = 'http://13.229.31.156/projects/'
const url1 = 'http://13.229.31.156/'
// const url = 'http://localhost:9000/projects/'
// const url1 = 'http://localhost:9000/'

// test push
// second test

function searchingFor(term) {
    return function (x) {
        return x.projectID.includes(term) || !term;
    }
}

export default class NewProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            projects: [],
            technology: [],
            term: "",
            projectID: "",
            projectName: "",
            semester: "",
            assignment: [{ assignmentName: "", assignmentDescription: "", assignmentPercentage: "" }],
            scope: "",
            description: "",
            industryLink: "",
            application: "",
            student: [{ studentID: "", studentName: "", studentYear: "" }],
            course: [{ courseID: "", courseName: "" }],
            addNew: true,
            selectedFile: null,
            projectImage: ""
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json }))
    }

    componentDidMount() {
        this.fetchData()
    }

    handleChange(e) {
        if (["studentID", "studentName", "studentYear"].includes(e.target.name)) {
            let student = [...this.state.student]
            student[e.target.dataset.id][e.target.name] = e.target.value
            this.setState({ student }, () => console.log(this.state.student))
        } else if (["courseID", "courseName"].includes(e.target.name)) {
            let course = [...this.state.course]
            course[e.target.dataset.id][e.target.name] = e.target.value
            this.setState({ course }, () => console.log(this.state.course))
        } else if (["assignmentName", "assignmentDescription", "assignmentPercentage"].includes(e.target.name)) {
            let assignment = [...this.state.assignment]
            assignment[e.target.dataset.id][e.target.name] = e.target.value
            this.setState({ assignment }, () => console.log(this.state.assignment))
        }
        else {
            var obj = {}
            obj[e.target.name] = e.target.value
            this.setState(obj)
        }
    }

    addStudent(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            student: [...prevState.student, { studentID: "", studentName: "", studentYear: "" }],
        }));
    }

    save() {
        if (this.state.addNew === true) {
            var bodyFormData = new FormData();
            bodyFormData.append('technology', this.state.technology)
            bodyFormData.append('projectID', this.state.projectID)
            bodyFormData.append('projectName', this.state.projectName)
            bodyFormData.append('semester', this.state.semester)
            bodyFormData.append('student', JSON.stringify(this.state.student))
            bodyFormData.append('course', JSON.stringify(this.state.course))
            bodyFormData.append('assignment', JSON.stringify(this.state.assignment))
            bodyFormData.append('scope', this.state.scope)
            bodyFormData.append('description', this.state.description)
            bodyFormData.append('industryLink', this.state.industryLink)
            bodyFormData.append('application', this.state.application)
            for (const key of Object.keys(this.state.selectedFile)) {
                bodyFormData.append('projectImage', this.state.selectedFile[key], this.state.selectedFile[key].name)
            }
            axios({
                method: 'post',
                url: url,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })

                .then(json => this.fetchData())
                .then(() => alert('Project Added'))
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        } else {
            var bodyFormData = new FormData();
            bodyFormData.append('technology', this.state.technology)
            bodyFormData.append('projectID', this.state.projectID)
            bodyFormData.append('projectName', this.state.projectName)
            bodyFormData.append('semester', this.state.semester)
            bodyFormData.append('student', JSON.stringify(this.state.student))
            bodyFormData.append('course', JSON.stringify(this.state.course))
            bodyFormData.append('assignment', JSON.stringify(this.state.assignment))
            bodyFormData.append('scope', this.state.scope)
            bodyFormData.append('description', this.state.description)
            bodyFormData.append('industryLink', this.state.industryLink)
            bodyFormData.append('application', this.state.application)
            for (const key of Object.keys(this.state.selectedFile)) {
                bodyFormData.append('projectImage', this.state.selectedFile[key], this.state.selectedFile[key].name)
            }
            axios({
                method: 'put',
                url: url,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })

                .then(json => this.fetchData())
                .then(() => alert('Project Updated'))
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }

    delete(id) {
        console.log(url + id)
        if (confirm('Do you want to delete project with id ' + id + '?')) {
            fetch(url + id, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData())
        }
    }

    add(technology, projectID, courseName, semester, studentID, studentName, course, studentYear, assignmentName, assignmentDescription, assignmentPercentage, scope, description, industryLink, application, courseID, assignment, student, projectImage) {
        this.setState({
            technology: [], projectID: '', projectName: '', semester: '', student: [{ studentID: '', studentName: '', studentYear: '' }], course: [{ courseID: '', courseName: '' }], assignment: [{ assignmentName: '', assignmentDescription: '', assignmentPercentage: '' }],
            scope: '', description: '', industryLink: '', application: '', projectImage: '', addNew: true
        })
    }

    edit(technology, projectID, semester, student, course, assignment, scope, description, industryLink, application) {
        this.setState({
            technology: technology, projectID: projectID, semester: semester, student: student, course: course, assignment: assignment,
            scope: scope, description: description, industryLink: industryLink, application: application, addNew: false
        })
    }

    deleteStudent(e, index) {
        e.preventDefault();
        this.setState({
            student: this.state.student.filter((s, sindex) => index !== sindex)
        })
    }

    fileSelectedHandler(e) {
        this.setState({ selectedFile: e.target.files })
    }

    render() {
        return (
            <div>
                <div className="jumbotron py-4 bg-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="display-4">Student Project</h1>
                                <p className="lead">Edit, delete or search for a student project here.</p>
                            </div>
                            <div className="col-md-4">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="search">Search by project ID</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="search" value={this.state.term} placeholder='Enter the project ID' onChange={this.searchHandler} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-info btn-outline-dark mt-0.5 ml-1" onClick={() => this.setState({ term: '' })}>Clear</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="container-fluid">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="projectID">Project ID</label>
                                        <input type="text" className="form-control" id="projectID" name='projectID' value={this.state.projectID} placeholder="Enter Project ID" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="projectName">Project Name</label>
                                        <input type="text" className="form-control" id="projectName" name='projectName' value={this.state.projectName} placeholder="Enter Project Name" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="technology">Technologies</label>
                                        <input type="text" className="form-control" id="technology" name='technology' value={this.state.technology} placeholder="Enter Technologies Used" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="semester">Semester</label>
                                        <input type="text" className="form-control" id="semester" name='semester' value={this.state.semester} placeholder="Enter Semester" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        {
                                            this.state.student.map((val, idx) => {
                                                let studentID = `studentID-${idx}`, studentName = `studentName-${idx}`, studentYear = `studentYear-${idx}`
                                                console.log("Student index ", idx)
                                                return (
                                                    <div key={idx}>
                                                        <strong style={{ textDecoration: 'underline' }}>{`Student #${idx + 1}`}</strong>&nbsp;
                                                        {
                                                            idx === 0 ? <button type="button" style={{ display: 'none' }} onClick={(e) => this.deleteStudent(e, idx)}>Del</button> : <button className="btn btn-danger" type="button" onClick={(e) => this.deleteStudent(e, idx)} data-toggle="tooltip" data-placement="bottom" title="Click to delete student"><i className="fas fa-minus"></i></button>
                                                        }
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label htmlFor={studentID}>ID</label>
                                                                <input
                                                                    type="text"
                                                                    name="studentID"
                                                                    data-id={idx}
                                                                    placeholder="Enter Student ID"
                                                                    id={studentID}
                                                                    value={this.state.student[idx].studentID}
                                                                    className="form-control"
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor={studentName}>Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="studentName"
                                                                    placeholder="Enter Student Name"
                                                                    data-id={idx}
                                                                    id={studentName}
                                                                    value={this.state.student[idx].studentName}
                                                                    className="form-control"
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor={studentYear}>Year</label>
                                                                <input
                                                                    type="text"
                                                                    name="studentYear"
                                                                    placeholder="Enter student year"
                                                                    data-id={idx}
                                                                    id={studentYear}
                                                                    value={this.state.student[idx].studentYear}
                                                                    className="form-control"
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>
                                                )
                                            })
                                        }
                                        <button className="btn btn-link" onClick={this.addStudent.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Click to add new student">+ Add new student</button>
                                    </div>
                                    <p style={{ textDecoration: 'underline' }}><strong>Course</strong></p>
                                    <div className="form-group">
                                        {
                                            this.state.course.map((val, idx) => {
                                                let courseID = `courseID-${idx}`, courseName = `courseName-${idx}`
                                                return (
                                                    <div key={idx}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor={courseID}>Course ID</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter Course ID"
                                                                    name="courseID"
                                                                    data-id={idx}
                                                                    id={courseID}
                                                                    value={this.state.course[idx].courseID}
                                                                    className="form-control"
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor={courseName}>Name</label>
                                                                <input
                                                                    placeholder="Enter Course Name"
                                                                    type="text"
                                                                    name="courseName"
                                                                    data-id={idx}
                                                                    id={courseName}
                                                                    value={this.state.course[idx].courseName}
                                                                    className="form-control"
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p style={{ textDecoration: 'underline' }}><strong>Assignment</strong></p>
                                    <div className="form-group">
                                        {
                                            this.state.assignment.map((val, idx) => {
                                                let assignmentName = `assignmentName-${idx}`, assignmentDescription = `assignmentDescription-${idx}`, assignmentPercentage = `assignmentPercentage-${idx}`
                                                return (
                                                    <div key={idx}>
                                                        <label htmlFor={assignmentName}> Name</label>
                                                        <input
                                                            type="text"
                                                            name="assignmentName"
                                                            placeholder="Enter Assignment Name"
                                                            data-id={idx}
                                                            id={assignmentName}
                                                            value={this.state.assignment[idx].assignmentName}
                                                            className="form-control"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                        <label htmlFor={assignmentDescription}>Description</label>
                                                        <textarea
                                                            type="text"
                                                            name="assignmentDescription"
                                                            placeholder="Enter Assignment Description"
                                                            data-id={idx}
                                                            id={assignmentDescription}
                                                            value={this.state.assignment[idx].assignmentDescription}
                                                            className="form-control"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                        <label htmlFor={assignmentPercentage}>Percentage</label>
                                                        <input
                                                            type="text"
                                                            name="assignmentPercentage"
                                                            placeholder="Enter Assignment Percentage"
                                                            data-id={idx}
                                                            id={assignmentPercentage}
                                                            value={this.state.assignment[idx].assignmentPercentage}
                                                            className="form-control"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scope">Scope</label>
                                        <textarea type="text" className="form-control" id="scope" name='scope' value={this.state.scope} placeholder="Enter Project Scope" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea type="text" className="form-control" id="description" name='description' value={this.state.description} placeholder="Enter Project Description" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="industryLink">Industry partners</label>
                                        <input type="text" className="form-control" id="industryLink" name='industryLink' value={this.state.industryLink} placeholder="Enter Company" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="application">Application</label>
                                        <textarea type="text" className="form-control" id="application" name='application' value={this.state.application} placeholder="Enter Application" onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <input type="file" name="file" onChange={this.fileSelectedHandler.bind(this)} multiple />
                                </form>
                                <br />
                                <button className="btn btn-primary" onClick={this.save.bind(this)} >Save</button>  &nbsp; &nbsp;
                                    <button className="btn btn-success" onClick={this.add.bind(this)}>Reset</button>
                                <br />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div>
                                <h3 className="text-center" style={{ letterSpacing: 2 + 'px' }}>LIST OF PROJECTS</h3>
                            </div>
                            <div className="container">
                                <div className="row">
                                    {this.state.projects.filter(searchingFor(this.state.term)).map((s, index) =>
                                        <div className="col-md-3" key={index}>
                                            <div className="card-deck">
                                                <div className="card mb-4 h-100" style={{ maxWidth: 20 + 'rem' }}>
                                                    <div className="card-body">
                                                        <h4 className="card-title">{s.projectID}</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">{s.course.map(s => s.courseName)}</h6>
                                                        <p className="card-text">{s.description}</p>
                                                        <button className="btn btn-danger" onClick={this.delete.bind(this, s._id)}>Delete</button> &nbsp;&nbsp;
                                                        <button className="btn btn-info" onClick={this.edit.bind(this, s.technology, s.projectID, s.projectName, s.semester, s.student, s.course, s.assignment, s.scope, s.description, s.industryLink, s.application)}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
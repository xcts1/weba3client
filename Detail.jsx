import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const url = 'http://13.229.31.156/projects/search'
const url1 = 'http://13.229.31.156/'
// const url = 'http://localhost:9000/projects/search'
// const url1 = 'http://localhost:9000/'
export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            technology: [],
            projectID: "",
            semester: "",
            student: [],
            course: [],
            assignment: [{ assignmentName: "", assignmentDescription: "", assignmentPercentage: "" }],
            scope: "",
            description: "",
            industryLink: "",
            application: "",
            students: [{ studentID: "", studentName: "", studentYear: "" }],
            courses: [{ courseID: "", courseName: "" }]
        }

    }
    fetchData() {
        fetch(url.concat(window.location.pathname))
            .then(res => res.json())
            .then(json => this.setState({ projects: json }))
        console.log(url.concat(window.location.pathname))
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
            // var obj = {}
            // obj[e.target.name] = e.target.value
            // this.setState(obj)
            this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
    }
    save() {

        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                technology: this.state.technology,
                projectID: this.state.projectID,
                semester: this.state.semester,
                student: this.state.student,
                course: this.state.course,
                assignment: this.state.assignment,
                scope: this.state.scope,
                description: this.state.description,
                industryLink: this.state.industryLink,
                application: this.state.application
            })
        }).then(res => res.json())
            .then(json => this.fetchData())
    }
    addStudent(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            student: [...prevState.student, { studentID: "", studentName: "", studentYear: "" }],
        }));
    }

    handleSubmit(e) {
        // e.preventDefault() 
    }

    render() {
        console.log(this.state.projects)
        return (
            <div className="container">
                <div>
                    <Link to='/project'>
                        <button>Back</button>
                    </Link>
                    <table>
        <tbody>
                    {this.state.projects.map((s, idx) =>
                        <tr key={idx}>
                            <td className='text-break'>technology: {s.technology}<br />
                                projectID: {s.projectID}<br />
                                semester: {s.semester}<br />

                                {s.student.map((s, idx) =>
                                    <div key={idx}>studentID: {s.studentID}
                                        studentName: {s.studentName}
                                        studentYear: {s.studentYear}</div>)}
                                {s.course.map((s, idx) =>
                                    <div key={idx}>courseID: {s.courseID}
                                        courseName: {s.courseName}</div>)}
                                {s.assignment.map((s, idx) =>
                                    <div key={idx}>assignmentName: {s.assignmentName}
                                        assignmentDescription: {s.assignmentDescription}
                                        assignmentPercentage: {s.assignmentPercentage}</div>)}
                                scope: {s.scope}<br />
                                description: {s.description}<br />
                                industryLink: {s.industryLink}<br />
                                application: {s.application}<br />
                                Image: <br />
                                {s.projectImage.map((s, index) =>
                                    // <div className="thumbnail"><img className="thumbnail-img" src={url1.concat(s)} alt="Smiley face" />
                                    //     {console.log(url1.concat(s))}
                                    // </div>
                                    <div key={index} className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={url1.concat(s)} allowFullScreen></iframe>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                    /</tbody>
                    /</table>
                </div>
            </div>
            // <div>
            //     <form onSubmit={this.handleSubmit.bind(this)}>
            //         {this.state.projects.map(s =>
            //             <div>
            //                 <div className="form-group">
            //                     <label htmlFor="projectID">Project ID</label>
            //                     <input type="text" className="form-control" id="projectID" name='projectID' value={s.projectID} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="technology">Technologies</label>
            //                     <input type="text" className="form-control" id="technology" name='technology' value={s.technology} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="semester">Semester</label>
            //                     <input type="text" className="form-control" id="semester" name='semester' value={s.semester} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     {
            //                         s.student.map((val, idx) => {
            //                             let studentID = `studentID-${idx}`, studentName = `studentName-${idx}`, studentYear = `studentYear-${idx}`
            //                             return (
            //                                 <div key={idx}>
            //                                     <strong style={{ textDecoration: 'underline' }}>{`Student #${idx + 1}`}</strong> <br />
            //                                     <label htmlFor={studentID}>ID</label>
            //                                     <input
            //                                         type="text"
            //                                         name="studentID"
            //                                         data-id={idx}
            //                                         placeholder="Enter Student ID"
            //                                         id={studentID}
            //                                         value={s.student[idx].studentID}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                     <label htmlFor={studentName}>Name</label>
            //                                     <input
            //                                         type="text"
            //                                         name="studentName"
            //                                         placeholder="Enter Student Name"
            //                                         data-id={idx}
            //                                         id={studentName}
            //                                         value={s.student[idx].studentName}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                     <label htmlFor={studentYear}>Year</label>
            //                                     <input
            //                                         type="text"
            //                                         name="studentYear"
            //                                         placeholder="Enter student year"
            //                                         data-id={idx}
            //                                         id={studentYear}
            //                                         value={s.student[idx].studentYear}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     /> <br />
            //                                 </div>
            //                             )
            //                         })
            //                     }
            //                     <button onClick={this.addStudent.bind(this)}>Add new student</button>
            //                 </div>
            //                 <p style={{ textDecoration: 'underline' }}><strong>Course</strong></p>
            //                 <div className="form-group">
            //                     {
            //                         s.course.map((val, idx) => {
            //                             let courseID = `courseID-${idx}`, courseName = `courseName-${idx}`
            //                             return (
            //                                 <div key={idx}>
            //                                     <label htmlFor={courseID}>Course ID</label>
            //                                     <input
            //                                         type="text"
            //                                         placeholder="Enter Course ID"
            //                                         name="courseID"
            //                                         data-id={idx}
            //                                         id={courseID}
            //                                         value={s.course[idx].courseID}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                     <label htmlFor={courseName}>Name</label>
            //                                     <input
            //                                         placeholder="Enter Course Name"
            //                                         type="text"
            //                                         name="courseName"
            //                                         data-id={idx}
            //                                         id={courseName}
            //                                         value={s.course[idx].courseName}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                 </div>
            //                             )

            //                         })
            //                     }
            //                 </div>
            //                 <p style={{ textDecoration: 'underline' }}><strong>Assignment</strong></p>
            //                 <div className="form-group">
            //                     {
            //                         s.assignment.map((val, idx) => {
            //                             let assignmentName = `assignmentName-${idx}`, assignmentDescription = `assignmentDescription-${idx}`, assignmentPercentage = `assignmentPercentage-${idx}`
            //                             return (
            //                                 <div key={idx}>
            //                                     <label htmlFor={assignmentName}> Name</label>
            //                                     <input
            //                                         type="text"
            //                                         name="assignmentName"
            //                                         placeholder="Enter Assignment Name"
            //                                         data-id={idx}
            //                                         id={assignmentName}
            //                                         value={s.assignment[idx].assignmentName}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                     <label htmlFor={assignmentDescription}>Description</label>
            //                                     <input
            //                                         type="text"
            //                                         name="assignmentDescription"
            //                                         placeholder="Enter Assignment Description"
            //                                         data-id={idx}
            //                                         id={assignmentDescription}
            //                                         value={s.assignment[idx].assignmentDescription}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                     <label htmlFor={assignmentPercentage}>Percentage</label>
            //                                     <input
            //                                         type="text"
            //                                         name="assignmentPercentage"
            //                                         placeholder="Enter Assignment Percentage"
            //                                         data-id={idx}
            //                                         id={assignmentPercentage}
            //                                         value={s.assignment[idx].assignmentPercentage}
            //                                         className="form-control"
            //                                         onChange={this.handleChange.bind(this)}
            //                                     />
            //                                 </div>
            //                             )
            //                         })
            //                     }
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="scope">Scope</label>
            //                     <textarea type="text" className="form-control" id="scope" name='scope' value={s.scope} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="description">Description</label>
            //                     <textarea type="text" className="form-control" id="description" name='description' value={s.description} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="industryLink">Industry partners</label>
            //                     <input type="text" className="form-control" id="industryLink" name='industryLink' value={s.industryLink} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="application">Application</label>
            //                     <input type="text" className="form-control" id="application" name='application' value={s.application} onChange={this.handleChange.bind(this)} required />
            //                 </div>
            //             </div>
            //         )}
            //     </form>
            //     <button className="btn btn-info btn-outline-dark mx-2" onClick={this.save.bind(this)} >Save</button>

            // </div>
        )
    }
}

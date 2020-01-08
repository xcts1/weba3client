import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const url = 'http://13.229.31.156/projects/search'
const url1 = 'http://13.229.31.156/'

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            technology: [],
            projectID: "",
            projectName: "",
            semester: "",
            student: [],
            course: [],
            assignment: [{ assignmentName: "", assignmentDescription: "", assignmentPercentage: "" }],
            scope: "",
            description: "",
            industryLink: "",
            application: "",
            students: [{ studentID: "", studentName: "", studentYear: "" }],
            courses: [{ courseID: "", courseName: "" }],
            projectImage: []
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

    render() {
        console.log(this.state.projects)
        return (
            <div>
                <div className="container">
                    <br />
                    <h2 className="text-center">PROJECT DETAILS</h2>
                    <div className="container">
                        {this.state.projects.map((s, idx) =>
                            <div key={idx}>
                                <h5 className="text-center">PROJECT: {s.projectID}: {s.projectName}</h5>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <strong style={{ textDecoration: 'underline' }}>Students:</strong> <br />
                                        {s.student.map(s =>
                                            <div>
                                                <strong>Name: </strong>{s.studentName} - <strong>ID: </strong>{s.studentID} - <strong>Year: </strong>{s.studentYear} <br />
                                            </div>)}

                                    </div>
                                    <div className="col-lg-6">
                                        <strong style={{ textDecoration: 'underline' }}>Course:</strong> {s.course.map(s => s.courseID)}-{s.course.map(s => s.courseName)}
                                    </div>
                                </div>
                                <br />
                                <strong style={{ textDecoration: 'underline' }}>Assignment:</strong> {s.assignment.map(s => s.assignmentName)}({s.assignment.map(s => s.assignmentPercentage)}%) <br />
                                <strong>Description:</strong> {s.assignment.map(s => s.assignmentDescription)}
                                <br />
                                <br />
                                <strong style={{ textDecoration: 'underline' }}>Project Details:</strong> <br />
                                <strong>Semester:</strong> {s.semester} <br />
                                <strong>Technology:</strong> {s.technology} <br />
                                <strong>Scope: </strong> {s.scope} <br />
                                <strong>Description: </strong> {s.description} <br />
                                <strong>Industry Link: </strong>{s.industryLink} <br />
                                <strong>Application: </strong> {s.application}
                                <h4 className="text-center">IMAGES & VIDEOS</h4>
                                {/* <p className="text-center"><em>*Right click and choose "Open image in new tab" to view image in full-size</em></p> */}
                                <div className="row">
                                    {s.projectImage.map((s, index) =>
                                        <div className="col-md-4">
                                            <div>
                                                {
                                                    url1.concat(s).includes('mp4') ?
                                                        <div className="row">
                                                            <div className="column">
                                                                <iframe src={url1.concat(s)} allowFullScreen></iframe>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div>
                                                            <div >
                                                                <a href={url1.concat(s)} data-lightbox="photos"
                                                                >
                                                                    <img src={url1.concat(s)} className="img-thumbnail hover-shadow" ></img></a>
                                                            </div>
                                                            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                                                            <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/js/lightbox.min.js"></script>
                                                        </div>
                                                }
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <Link to='/project'>
                            <button className="btn btn-link">View other projects</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

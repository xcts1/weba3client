import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Detail from './Detail.jsx'
const url = 'http://13.229.31.156/projects/'
const url1 = 'http://13.229.31.156/'

function searchingFor(term) {
    return function (x) {
        return x.projectID.includes(term) || !term;
    }
}
export default class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tempt_projects: [],
            term: "",
            projects: [],
            projectName: "",
            keyword: "",
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
            sort: 'asc',
            students: [{ studentID: "", studentName: "", studentYear: "" }],
            courses: [{ courseID: "", courseName: "" }]
        }
        this.searchHandler = this.searchHandler.bind(this);
    }
    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json, tempt_projects: json }))
    }

    componentDidMount() {
        this.fetchData()
    }

    semester_search(semester, event) {
        this.setState({ semester: event.target.value }, () => {
            fetch(url + 'search_semester?semester=' + this.state.semester)
                .then(res => res.json())
                .then(json => this.setState({ projects: json }))
            console.log(url + '/search_semester?' + this.state.semester)
        })
    }

    course_search(courseID, event) {
        this.setState({ courseID: event.target.value }, () => {
            fetch(url + 'search_course?courseID=' + this.state.courseID)
                .then(res => res.json())
                .then(json => this.setState({ projects: json }))
            console.log(url + 'search_course?courseID=' + this.state.courseID)
        })
    }

    search_fields(keyword) {
        if (keyword === "") {
            this.fetchData()
        }
        else {
            fetch(url + 'find/' + keyword)
                .then(res => res.json())
                .then(json => this.setState({ projects: json }))
            console.log(url + 'find/' + keyword)
            console.log('keyword: ' + keyword)
        }
    }

    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleFilterByProjectID(filter) {
        if (filter === 'asc') {
            let asc = this.state.projects.sort(function (a, b) {
                var textA = a.projectName.toUpperCase();
                var textB = b.projectName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            this.setState({ currentDisplay: asc });
        }
        else if (filter === 'des') {
            let des = this.state.projects.sort(function (a, b) {
                var textA = a.projectName.toUpperCase();
                var textB = b.projectName.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            this.setState({ currentDisplay: des });
        }
    }

    render() {
        let unique = [...new Set(this.state.tempt_projects.map(s => s.semester))];
        // let unique1 = [...new Set(this.state.tempt_projects.map(s => s.course.map(s => s.courseID)))];

        const unique1 = []
        const renderList = this.state.tempt_projects.map(s => {
            s.course.map(s => {
                if (!unique1.includes(s.courseID)) {
                    unique1.push(s.courseID)
                }
                return (
                    unique1
                )
            })

        })
        { console.log("unique1: " + unique1) }
        return (
            <div>
                <div className="jumbotron py-4 jumbotron-cover-image">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="display-4" style={{ color: 'grey' }}>Student Project</h1>
                                <p className="lead" style={{ color: 'grey' }}>View, Filter, Sort, Search for a student project.</p>
                            </div>
                            <div className="col-md-4">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3"></div>
                    <div className="col-md-5">
                            <div className="input-group mb-3">
                                <input type="text" placeholder="Enter Key Word (Course, Technology, Project,...)" className="form-control" onChange={this.handleChange.bind(this)} name="keyword" value={this.state.keyword} />
                                <div className="input-group-append">
                                    <button onClick={this.search_fields.bind(this, this.state.keyword)} className="btn btn-outline-secondary" type="button">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="dropdown">
                                <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sort by Project Name</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => this.handleFilterByProjectID('asc')}>Ascending</a>
                                    <a className="dropdown-item" onClick={() => this.handleFilterByProjectID('des')}>Descending</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2">
                            <div>
                                <div className="border border-secondary">
                                    <div className='card-header bg-warning text-white'>
                                        <h5>Filter Projects</h5>
                                    </div>
                                    <div className='card-body'>
                                        <form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="search" value={this.state.term} placeholder='Project ID' onChange={this.searchHandler} />
                                                    <div className="input-group-append">
                                                        <button type="button" className="btn btn-danger" onClick={() => this.setState({ term: '' })}>Clear</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className='card-header' style={{ backgroundColor: 'white' }}>
                                            <h6 className="card-title"> <strong>Semester</strong></h6>
                                            <div className="list-group">
                                                {console.log("Semester" + this.state.semester)}
                                                <button type='button' onClick={this.semester_search.bind(this, this.state.semester)} value={""} className="list-group-item list-group-item-action">All Semester</button>
                                                {unique.map(s =>
                                                    <button type='button' onClick={this.semester_search.bind(this, this.state.semester)} value={s}
                                                        className="list-group-item list-group-item-action">{s}</button>
                                                )}
                                            </div>
                                        </div>
                                        <div className='card-header' style={{ backgroundColor: 'white' }}>
                                            <h6 className="card-title"><strong>Course</strong></h6>
                                            <div className="list-group">
                                                <button type='button' onClick={this.course_search.bind(this, this.state.course.map(s => s.courseID))} value={""} className="list-group-item list-group-item-action">All Course</button>
                                                {unique1.map(s =>
                                                    <button type='button' onClick={this.course_search.bind(this, this.state.course.map(s => s.courseID))} value={s}
                                                        className="list-group-item list-group-item-action">{s}</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="row">
                                {this.state.projects.filter(searchingFor(this.state.term)).map((s, index) =>
                                    <div className="col-md-3" key={index}>
                                        <div className="card-deck">
                                            <div className="card mb-3" style={{ width: 12 + 'rem', height: 15 + 'rem' }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{s.projectID}: {s.projectName}</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">{s.course.map(s => s.courseName)}</h6>
                                                    <div className="card-text" style={{ height: 5 + 'rem' }}>
                                                        {s.description} <br /> <br />
                                                        <em> <strong>Technology used:</strong> {s.technology}</em></div>
                                                </div>
                                                <div className="card-text">
                                                    <Link to={`${s.projectID}`}>
                                                        <button className="btn btn-primary ">View Detail</button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
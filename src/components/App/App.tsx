import {useState} from 'react';
import {Layout, Menu, Alert} from 'antd';
import useCourses from '../../hooks/useCourses';
import CourseSearch from '../CourseSearch/CourseSearch';
import CourseTable from '../CoursesTable/CourseTable';
import {Course} from '../../types/course';
import config from '../../config';

const {apiUrl, semester, appName} = config;

export default function App() {

    // Keep track of the selected rows.
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

    const {courses, error, fetching} = useCourses(apiUrl);

    const handleSearch = (searchValue) => {
        // If the search value is empty, reset the state.
        if (!searchValue) {
            setFilteredCourses(
                courses
                    .filter(course => course.semester === semester)
                    .filter(course => Boolean(course.times))
            );
        }
        // Filter the courses by the search value.
        setFilteredCourses(
            courses
                .filter(course => course.title.toLowerCase().includes(searchValue.toLowerCase()))
                .filter(course => course.semester === semester)
                .filter(course => Boolean(course.times))
        );
    }

    return (
        <div className="App">
            <Layout>
                <Layout.Header style={{padding:0}}>
                    <Menu mode="horizontal" selectable={false} style={{backgroundColor: '#631919', color: '#ffffff', fontSize: '1.5rem', margin: '0.25rem 0'}}>
                        <Menu.Item key="1">{appName}</Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content>
                    {error && <Alert message={error} type="error" />}
                    <CourseSearch placeholder="Search for a course by name. Try: Introduction to" enterButton="search" allowClear size="large" onSearch={handleSearch} />     
                    <CourseTable courses={filteredCourses} loading={fetching} />
                </Layout.Content>
            </Layout>
        </div>
    );
}

import {useState} from 'react';
import {Layout, Menu, Alert} from 'antd';
import useCourses from '../../hooks/useCourses';
import CourseSearch from '../CourseSearch/CourseSearch';
import CourseTable from '../CoursesTable/CourseTable';
import {Course} from '../../types/course';

const endpoint = 'https://secure.swarthmore.edu/trico-course-guide/courses.json';

export default function App() {

    // Keep track of the selected rows.
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

    const {courses, error, fetching} = useCourses(endpoint);

    const handleSearch = (searchValue) => {
    // If the search value is empty, reset the state.
        if (!searchValue) {
            setFilteredCourses(courses);
            return;
        }
        // Filter the courses by the search value.
        setFilteredCourses(courses.filter(course => course.title.toLowerCase().includes(searchValue.toLowerCase())));
    }

    return (
        <div className="App">
            <Layout>
                <Layout.Header>
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item key="1">Course Search</Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content>
                    {error && <Alert message={error} type="error" />}
                    <CourseSearch placeholder="Begin typing to filter courses" enterButton="search" allowClear size="large" onSearch={handleSearch} />     
                    <CourseTable 
                        courses={filteredCourses} 
                        loading={fetching}
                    />
                </Layout.Content>
            </Layout>
        </div>
    );
}
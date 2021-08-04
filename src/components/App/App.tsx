import {useState} from 'react';
import {Layout, Menu, Alert, Button, Space, Popover} from 'antd';
import useCourses from '../../hooks/useCourses';
import CourseSearch from '../CourseSearch/CourseSearch';
import CourseTable from '../CoursesTable/CourseTable';
import {Course} from '../../types/course';

const endpoint = 'https://secure.swarthmore.edu/trico-course-guide/courses.json';

export default function App() {

  // Keep track of the selected rows.
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const {courses, error, fetching} = useCourses(endpoint);

  const handleSearch = (searchValue) => {
    // Make sure any selected row keys are cleared.
    setSelectedRowKeys([]);
    // If the search value is empty, reset the state.
    if (!searchValue) {
      setFilteredCourses(courses);
      return;
    }
    // Filter the courses by the search value.
    setFilteredCourses(courses.filter(course => course.title.toLowerCase().includes(searchValue.toLowerCase())));
  }

  // Handle what happens when the user selects or deselects a row.
  const onSelectChange = selectedRowKeys => {
    // Add the full course object to the selectedRows array.
    const selected = selectedRowKeys.map(key => filteredCourses[key]);
    setSelectedRows(selected);
    // TODO: Make sure that the selected rows have an instructor and time.
    setSelectedRowKeys(selectedRowKeys);
  };

  // Row selection config for table.
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  // Keep track of how many rows are selected.
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="App">
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key="1">
              Swarthmore College Course Builder
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content>
          {error && <Alert message={error} type="error" />}
          <CourseSearch placeholder="Begin typing to filter courses" enterButton="search" allowClear size="large" onSearch={handleSearch} />
          <div>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </div>
          <div className="SelectedCourses">
            <Space direction="horizontal">
              {selectedRows.map((course, i) => (
                <div key={i}>
                  <Popover
                    title={course.title + ' ' + course.reg_id}
                    content={(
                      <div>
                        <Button>Download iCal</Button>
                        <Button>Remove</Button>
                      </div>
                    )}
                  >
                    <Button>{course.title}</Button>
                  </Popover>
                </div>
              ))}
            </Space>
          </div>
          <CourseTable 
            rowSelection={rowSelection} 
            courses={filteredCourses} 
            loading={fetching}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
}
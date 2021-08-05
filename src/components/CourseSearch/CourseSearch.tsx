import {Input} from 'antd';

const {Search} = Input;

export default function CourseSearch(props) {
    return (
        <div className="CourseSearch">
            <Search {...props} />
        </div>
    );
}
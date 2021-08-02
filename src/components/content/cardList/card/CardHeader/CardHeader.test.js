import { shallow } from 'enzyme';
import { FiCheckCircle, FiEdit } from 'react-icons/fi';
import CardHeader from './CardHeader';

describe('<CardHeader /> component', () => {
    let wrapper;
    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<CardHeader
            title={"Something"}
            viewOnly={false}
            isEdited={false}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />);
    });

    it('CardHeader must have title from props', () => {
        expect(wrapper.find(".title-text").text()).toContain("Something");
    })

    it('should call onCancel in componentDidUpdate', () => {
        wrapper.setProps({ viewOnly: true });
        expect(onCancel).toBeCalledTimes(1);
    });

    it('change title', () => {
        const newTitle = { target: { value: "newTitle" } };
        wrapper.instance().onChange(newTitle);
        expect(wrapper.state('title')).toEqual(newTitle.target.value);
    });

    it('should contain FiEdit if it\'s not an edit mode', () => {
        expect(wrapper.contains(<FiEdit />)).toEqual(true);
    });

    it('should call onSubmit on FiCheckCircle click', () => {
        wrapper.setProps({ isEdited: true, viewOnly: false });
        wrapper.find(FiCheckCircle).simulate('click');
        expect(onSubmit).toBeCalledTimes(1);
    });

})
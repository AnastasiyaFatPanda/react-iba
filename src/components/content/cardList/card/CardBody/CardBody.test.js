import { shallow } from 'enzyme';

import CardBody from './CardBody';

describe('<CardBody /> component', () => {
    let wrapper;
    const onCancel = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<CardBody
            descr={"Something"}
            viewOnly={false}
            isEdited={false}
            onCancel={onCancel}
        />);
    });

    it('CardBody must have description', () => {
        expect(wrapper.find(".descr").text()).toContain("Something");
    })

    it('should call onCancel in componentDidUpdate', () => {
        wrapper.setProps({ viewOnly: true });
        expect(onCancel).toBeCalledTimes(1);
    });

    it('change description', () => {
        const newDescription = { target: { value: "newDescription" } };
        wrapper.instance().onChange(newDescription);
        expect(wrapper.state('descr')).toEqual(newDescription.target.value);
    });

})
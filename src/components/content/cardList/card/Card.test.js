import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'

import { Card } from './Card';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

describe('<Card /> component', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
        const history = createMemoryHistory()
        wrapper = shallow(<Card history={history} />);
        wrapper.setProps({
            selectedCard: false,
            isEdited: false,
            title: "Something",
            descr: "Something",
        });
        instance = wrapper.instance();
        instance.cardBodyRef = { current: { setState: jest.fn() } };
        instance.cardHeaderRef = { current: { setState: jest.fn() } };
    });

    it('Card must have CardBody ', () => {
        expect(wrapper.find(CardBody)).toBeTruthy();
    })

    it('Card must have CardHeader', () => {
        expect(wrapper.find(CardHeader)).toBeTruthy();
    })

    it('change title and description and cancel', () => {
        wrapper.setProps({ onEdit: () => { } });
        wrapper.setState({ title: 'title', descr: 'descr' });
        instance.onCancel();
        expect(wrapper.state('title')).toEqual('title');
        expect(wrapper.state('descr')).toEqual('descr');
    });

    it('should call onCancel in componentDidUpdate', () => {
        const spy = jest.spyOn(instance, 'onCancel');
        wrapper.setState({ isEdited: true });
        wrapper.setProps({ viewOnly: true });
        expect(spy).toBeCalledTimes(1);
    });

    it('call handleCheckboxClick on checkBox click', () => {
        wrapper.setProps({ onSelect: () => { } });
        instance.handleCheckboxClick();
        expect(wrapper.state('selectedCard')).toEqual(true);
    });

    it('check isEdited state on onEdit', () => {
        wrapper.setProps({ onSelect: () => { } });
        instance.onEdit();
        expect(wrapper.state('isEdited')).toEqual(true);
        expect(wrapper.state('selectedCard')).toEqual(false);
    });

    it('onSubmit', () => {
        wrapper.setProps({ onChange: () => { } });
        instance.cardBodyRef.current.state = { title: "Old Title", descr: "Old Description" };
        instance.onSubmit({ title: "New Title", descr: "New Description" });
        expect(wrapper.state('isEdited')).toEqual(false);
        expect(wrapper.state('title')).toEqual("New Title");
        expect(wrapper.state('descr')).toEqual("New Description");
    });

    it('call doubleClickHandler on doube click', () => {
        const spy = jest.spyOn(wrapper.instance(), 'doubleClickHandler');
        wrapper.simulate('DoubleClick');
        expect(spy).toBeCalledTimes(1);
    });

});
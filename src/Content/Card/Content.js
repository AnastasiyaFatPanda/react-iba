import Card from './Card/Card';
import './Content.scss';

const Content = () => (
    <div>
        <h2>Content</h2>
        <div className="content">
            <Card name="First Card" decr="Something" />
        </div>
    </div>
);

export default Content;
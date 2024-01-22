import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export function convertToNestedTree(categories, parentId = null, depth = 1) {
    const result = [];

    if (categories) {
        for (const category of categories) {
            if (category.parent_id === parentId) {
                const child = {
                    key: category.id,
                    title: (
                        <div className="category">
                            <p>{category.name}</p>
                            <Button onClick={() => console.log(category.id)}>
                                {' '}
                                <FormOutlined /> Edit Button
                            </Button>
                        </div>
                    ),
                    image: category.image,
                    isLeaf: depth >= 3 ? true : false,
                    children: [],
                };

                if (depth < 3) {
                    const grandchildren = convertToNestedTree(categories, category.id, depth + 1);
                    if (grandchildren.length > 0) {
                        child.children = grandchildren;
                    }
                }

                result.push(child);
            }
        }
    }

    return result;
}

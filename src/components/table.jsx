import { Form, Popconfirm, Table, Typography, Select} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDatatable, setDatatable } from '../store/tableReducer';
import { useSelector } from 'react-redux/es/exports';
import { getSelectTable } from '../store/selectReducer';
import '../table.css';
import { setLatLng } from '../store/coordsReducer';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    options,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            
        {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                    required: true,
                    message: `Пожалуйста введите ${title}!`,
                    },
                ]}
            >
                <Select options={options}/>
            </Form.Item>
        ) : (
            children
        )}
        </td>
    );
};

const Comp_Table = () => {
    const data = useSelector((state) => state.dataTableReducer)
    const selectWhence = useSelector((state => state.dataSelectReducer))
    const selectWhere = useSelector((state => state.dataSelectReducer))
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        dispatch(getDatatable());
        dispatch(getSelectTable());
    }, []);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key, record) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            const item = newData[index];
            newData.splice(index, 1, { ...row , ...row , key });
            saveCoordeRouting(record);
            dispatch(setDatatable(newData));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Не пройдена проверка:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Откуда',
            dataIndex: 'whence',
            width: '40%',
            minWidth: 100,
            editable: true,
        },
        {
            title: 'Куда',
            dataIndex: 'where',
            editable: true,
            width: '40%',
            minWidth: 100,
        },
        {
            title: 'Действия',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                <span>
                    <Typography.Link
                        onClick={() => save(record.key, record)}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        Сохранить
                    </Typography.Link>
                    <Popconfirm title="Желаете отменить?" onConfirm={cancel} cancelText={'Отменить'} okText={'Ок'}>
                        <a>Отменить</a>
                    </Popconfirm>
                </span>
                ) : (
                <Typography.Link className="editRow" disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Изменить
                </Typography.Link>
                );
            },
        },
    ];


    
    const saveCoordeRouting = record => {
        const whence = selectWhence.find(el => el.value === record.whence);
        const where = selectWhence.find(el => el.value === record.where);
        dispatch(setLatLng({from: whence.latLng, to: where.latLng}));
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
        ...col,
        onCell: (record) => {
            return {
                record,
                options: col.dataIndex == 'whence' ? selectWhence : selectWhere,
                dataIndex: col.dataIndex,
                title: col.title,
                style: {
                    width: col.width,
                    minWidth: col.minWidth,
                },
                editing: isEditing(record),
            }},
        };
    });

    const [activeRowIndex, setActiveRow] = useState();

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                pagination={false}
                rowClassName={(record, rowIndex) => rowIndex === activeRowIndex ? 'activeRow': ''}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => {
                            if(e.target.nodeName === 'A' || isEditing(record)) return;
                            setActiveRow(rowIndex);
                            saveCoordeRouting(record, rowIndex);
                        }
                    }
                }}
                scroll={{ x: true }}
            />
        </Form>
    );
};

export default Comp_Table;
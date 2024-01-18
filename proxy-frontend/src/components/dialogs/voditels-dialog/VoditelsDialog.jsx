import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import VoditelService from "../../../api/services/voditel-service";

export const VoditelsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [voditel, setVoditel] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setVoditel(currentRecord);
        } else {
            setVoditel(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await VoditelService.updateRecord({
                    id: currentRecord.id,
                    ...voditel,
                })
                : await VoditelService.createRecord(voditel)
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >

            <Space direction="vertical">

                <Space>
                    <Input
                        value={voditel?.lastName || ''}
                        onChange={e => setVoditel({ ...voditel, lastName: e.target.value })}
                        placeholder="Укажите фамилию"
                    />

                    <Input
                        value={voditel?.firstName || ''}
                        onChange={e => setVoditel({ ...voditel, firstName: e.target.value })}
                        placeholder="Укажите имя"
                    />

                    <Input
                        value={voditel?.patronymic || ''}
                        onChange={e => setVoditel({ ...voditel, patronymic: e.target.value })}
                        placeholder="Укажите отчество"
                    />
                </Space>

                <Input
                    value={voditel?.issued || ''}
                    onChange={e => setVoditel({ ...voditel, issued: e.target.value })}
                    placeholder="Укажите, кем выдан документ"
                />

                <Space align="center">
                    <Input
                        value={voditel?.series || ''}
                        onChange={e => setVoditel({ ...voditel, series: e.target.value })}
                        placeholder="Укажите серию"
                    />

                    <Input
                        value={voditel?.number || ''}
                        onChange={e => setVoditel({ ...voditel, number: e.target.value })}
                        placeholder="Укажите номер"
                    />
                </Space>

            </Space>
        </Modal>
    )
}
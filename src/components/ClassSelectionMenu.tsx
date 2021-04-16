
import classnames from 'classnames';
import capitalize from 'lodash/capitalize';
import React, { useEffect } from 'react';

import BallotIcon from '@material-ui/icons/Ballot';
import Box from '@material-ui/core/Box';
import * as muiColors from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';

import colors from '../common/colors';
import SidebarBoxContainer from './SideBarBoxContainer';

const LabelContainer = styled("div")({
    display: "flex",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.7,
    backgroundColor: "#fff",
    "&:hover": {
        opacity: 1,
    },
    "&.selected": {
        opacity: 1,
        fontWeight: "bold",
    },
})
const Circle = styled("div")({
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 8,
})
const Label = styled("div")({
    fontSize: 11,
})
const DashSep = styled("div")({
    flexGrow: 1,
    borderBottom: `2px dotted ${muiColors.grey[300]}`,
    marginLeft: 8,
    marginRight: 8,
})
const Number = styled("div")({
    fontSize: 11,
    textAlign: "center",
    minWidth: 14,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: "bold",
    color: muiColors.grey[700],
})

export const ClassSelectionMenu = ({
    selectedCls,
    regionClsList,
    onSelectCls,
}) => {
    useEffect(() => {
        const keyMapping = {}
        for (let i = 0; i < 9 && i < regionClsList.length; i++) {
            keyMapping[i + 1] = () => onSelectCls(regionClsList[i])
        }
        const onKeyDown = (e) => {
            if (keyMapping[e.key]) {
                keyMapping[e.key]()
                e.preventDefault()
                e.stopPropagation()
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [regionClsList, selectedCls, onSelectCls])

    return (
        <div>
            {regionClsList.map((label, index) => (
                <LabelContainer
                    className={classnames({ selected: label === selectedCls })}
                    onClick={() => onSelectCls(label)}
                >
                    <Circle style={{ backgroundColor: colors[index % colors.length] }} />
                    <Label className={classnames({ selected: label === selectedCls })}>
                        {capitalize(label)}
                    </Label>
                    <DashSep />
                    <Number className={classnames({ selected: label === selectedCls })}>
                        {index < 9 ? `Key [${index + 1}]` : ""}
                    </Number>
                </LabelContainer>
            ))}
        </div>
    )
}

export default ClassSelectionMenu
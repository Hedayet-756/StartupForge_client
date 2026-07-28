"use client";

import {
    InputGroup,
    TextField,
    Label,
    Select,
    Description,
    ListBox,
} from "@heroui/react";

export default function OpportunityFilter({
    search,
    setSearch,
    category,
    setCategory,
    jobType,
    setJobType,
    categories,
    isRemote,
    setIsRemote,
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-11/12 mx-auto items-center">

            {/* Search */}
            <TextField>
                <Label>Search Jobs</Label>

                <InputGroup>
                    <InputGroup.Prefix>
                        🔍
                    </InputGroup.Prefix>

                    <InputGroup.Input
                        placeholder="Frontend Developer, Google..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>

            </TextField>

            {/* Category Filter */}
            <Select
                onSelectionChange={(key) => {
                    setCategory(key === "all" ? "" : String(key));
                }}
            >
                <Label>Category</Label>

                <Select.Trigger>
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                </Select.Trigger>

                <Description>
                    Filter by job category
                </Description>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="all" key="all">
                            All Categories
                        </ListBox.Item>

                        {categories.map((item) => (
                            <ListBox.Item
                                id={item}
                                key={item}
                            >
                                {item}
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Job Type Filter */}
            <Select
                onSelectionChange={(key) => {
                    setJobType(key === "all-types" ? "" : String(key));
                }}
            >
                <Label>Job Type</Label>

                <Select.Trigger>
                    <Select.Value placeholder="Select Type" />
                    <Select.Indicator />
                </Select.Trigger>

                <Description>
                    Filter by employment type
                </Description>

                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="all-types" key="all-types">
                            All Types
                        </ListBox.Item>

                        <ListBox.Item id="full-time" key="full-time">
                            Full Time
                        </ListBox.Item>

                        <ListBox.Item id="part-time" key="part-time">
                            Part Time
                        </ListBox.Item>

                        <ListBox.Item id="internship" key="internship">
                            Internship
                        </ListBox.Item>

                        <ListBox.Item id="contract" key="contract">
                            Contract
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Remote Only Toggle Checkbox */}
            <div
                className="flex items-center gap-3 bg-[#0d1117] border border-zinc-800 px-4 py-3 rounded-xl cursor-pointer h-full hover:border-zinc-700 transition-all"
                onClick={() => setIsRemote(!isRemote)}
            >
                <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                />
                <div className="flex flex-col select-none">
                    <span className="text-white text-sm font-medium">Remote Jobs Only</span>
                    <span className="text-zinc-400 text-xs">Filter only remote opportunities</span>
                </div>
            </div>

        </div>
    );
}
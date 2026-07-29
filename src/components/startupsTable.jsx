"use client";
import React from 'react';
import { Table, Chip, Button } from '@heroui/react';
import { formatDistanceToNow } from 'date-fns';
import StartupsActions from './startupsActions';

export default function StartupsTable({ startups }) {
    console.log("companies", startups);
    return (
        <Table aria-label="Companies list table">
            <Table.ScrollContainer>
                <Table.Content>
                    <Table.Header>
                        <Table.Column isRowHeader className="bg-default/50 text-lg font-semibold text-white">Startup</Table.Column>
                        <Table.Column className="bg-default/50 text-lg font-semibold text-white">Industry</Table.Column>
                        <Table.Column className="bg-default/50 text-lg font-semibold text-white">Opportunities</Table.Column>
                        <Table.Column className="bg-default/50 text-lg font-semibold text-white">Status</Table.Column>
                        <Table.Column className="bg-default/50 text-lg font-semibold text-white">Submited</Table.Column>
                        <Table.Column className={"text-center bg-default/50 text-lg font-semibold text-white"}>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {startups.map((startup) => (
                            <Table.Row key={startup._id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={startup.logoUrl}
                                            alt={startup.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{startup.name}</p>
                                            <p className="text-xs text-zinc-500">{startup.location}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{startup.industry}</Table.Cell>
                                <Table.Cell>{startup.opportunityCount}</Table.Cell>
                                <Table.Cell>
                                    <Chip
                                        color={startup.isApproved ? "success" : "warning"}
                                        variant="flat"
                                    >
                                        {startup.isApproved ? "Approved" : "Pending"}
                                    </Chip>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-sm text-zinc-400">
                                        {startup.createdAt ? formatDistanceToNow(new Date(startup.createdAt), { addSuffix: true }) : "N/A"}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <StartupsActions startupId={startup._id} isApproved={startup.isApproved} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}
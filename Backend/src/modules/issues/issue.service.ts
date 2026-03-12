import Issue from "./issue.model";

export const createIssue = async (data: any) => {
    return Issue.create(data);
};
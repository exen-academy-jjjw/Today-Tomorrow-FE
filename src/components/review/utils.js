import React from "react";

// 웹 URL 경로
export function convertLocalFilePathToURL(localPath) {
    const pathSegments = localPath.replace(/\\/g, '/').split('/');
    const filePath = pathSegments.slice(1).join('/'); // Remove the drive letter from the path
    const UrlPath = `file:///${filePath}`;
    return UrlPath;
} 

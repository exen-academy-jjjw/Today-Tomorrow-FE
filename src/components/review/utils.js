import React from "react";

// 웹 URL 경로
function convertLocalFilePathToURL(localPath) {
    const pathSegments = localPath.split("\\");
    const fileName = pathSegments[pathSegments.length - 1];
    return `${process.env.PUBLIC_URL}/uploads/${fileName}`;
}

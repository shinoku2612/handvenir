const Config = require("../configs/config");
const stream = require("stream");
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
    Config.googledrive.clientId,
    Config.googledrive.clientSecret,
    Config.googledrive.redirectUri,
);
oauth2Client.setCredentials({ refresh_token: Config.googledrive.refreshToken });
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
class HGoogledrive {
    static async uploadFile(fileName, file) {
        try {
            const existingFileName = await drive.files.list({
                q: `name='${fileName}'`,
                fields: "files(id)",
                spaces: "drive",
            });
            const files = existingFileName.data.files;
            files.forEach((file) => {
                drive.files.delete({
                    fileId: file.id,
                });
            });

            const bufferStream = new stream.PassThrough();
            bufferStream.end(file.buffer);
            const result = await drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: "image/*",
                },
                media: {
                    mimeType: "image/*",
                    body: bufferStream,
                },
                fields: "id, name, webContentLink, webViewLink",
            });
            drive.permissions.create({
                fileId: result.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });
            return result.data;
        } catch (error) {
            return { status: "error", message: error.message };
        }
    }
}

module.exports = HGoogledrive;

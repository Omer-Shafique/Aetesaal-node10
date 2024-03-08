import { Context, Request } from 'koa'; // Import Request from koa
import * as Koa from 'koa';
import * as multer from 'koa-multer';
import * as fileService from '../services/file';

const upload = multer();

export const saveProfilePicture = async (ctx: Context, next: () => Promise<any>) => {
  const file = (ctx.request as Request & { files?: any }).files && (ctx.request as Request & { files?: any }).files.file;
  const userId = ctx.state.user.userId;
  ctx.state.data = await fileService.saveProfilePicture(userId, file);
  await next();
};

export const saveExecutionFile = async (ctx: Context, next: () => Promise<any>) => {
  const file = (ctx.request as Request & { files?: any }).files && (ctx.request as Request & { files?: any }).files.file;
  const applicationId = ctx.request.body.applicationId;
  const formFieldId = ctx.request.body.formFieldId;
  ctx.state.data = await fileService.saveExecutionFile(`${applicationId}/${formFieldId}`, file);
  await next();
};

// Create a Koa app and apply the multer middleware
const app = new Koa();
app.use(upload.any()); // This will handle file uploads for all routes, adjust as needed

// Example route usage
app.use(saveProfilePicture);
app.use(saveExecutionFile);

app.listen(3000); // Adjust the port as needed
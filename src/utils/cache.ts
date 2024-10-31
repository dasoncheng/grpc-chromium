import { readdir, stat, unlink, writeFile } from "fs/promises";
import { extname, join } from "path";

/**
 * 清理指定目录中的文件，如果它们的修改时间超过给定的超时时间。
 *
 * @param {string} directory - 包含要清理文件的目录。
 * @param {string[]} files - 要检查并可能删除的文件列表。
 * @param {number} [timeout=2 * 60 * 60 * 1000] - 超时时间（以毫秒为单位）。修改时间超过此时间的文件将被删除。默认是2小时。
 * @returns {Promise<void>} - 当操作完成时返回一个Promise。
 */
export async function clearFiles(
  directory: string,
  { ext = ".pdf", timeout = 2 * 60 * 60 * 1000 }: { ext?: string; timeout?: number } = {},
) {
  try {
    const files = (await readdir(directory)).filter((file) => extname(file).toLowerCase() === ext);
    const now = Date.now();
    for (const file of files) {
      const filePath = join(directory, file);
      const fileStat = await stat(filePath);
      if (now - fileStat.mtime.getTime() > timeout) {
        await unlink(filePath);
      }
    }
  } catch (error) {
    //
  }
}

export async function clearAndSave(buf: Buffer) {
  const directory = join(__dirname, "../../output");
  await clearFiles(directory);
  await writeFile(join(directory, `${new Date().toISOString()}.pdf`), buf);
}

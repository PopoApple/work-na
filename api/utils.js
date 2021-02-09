import { isNotEmpty } from '~/utils'
/**
 * 判断响应是否成功
 * @param obj
 * @returns {boolean}
 */
export const isSuccess = (response) => {
	let success = true
	if (!isNotEmpty(response) || (response.code !== undefined && response.code !== 200 && response.code !== 0)) {
		success = false
	}
	return success
}
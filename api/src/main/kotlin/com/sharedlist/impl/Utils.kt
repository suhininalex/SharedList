package com.sharedlist.impl

import java.util.*

object UIDGenerator {
    fun getID(): String = UUID.randomUUID().toString()
}